//Cuida dos itens dentro de um pedido, cada produto adicionado a um pedido; 
import { ItensPedido } from "../models/ItensPedido.js"
import { Pedido } from "../models/Pedido.js";
//Puxa dois repository pois busca o preço do produto antes de criar o item do pedido.
import itensPedidoRepository from "../repositories/itensPedidoRepository.js";
import produtoRepository from "../repositories/produtoRepository.js";

const pedidoController = {

    criar: async (req, res) => {
        try {
            let { pedidoId, produtoId, quantidade } = req.body
            const resultado = await produtoRepository.selecionarValor(produtoId);
            //Antes de salvar o item ele vai no banco buscar o preço do produto
            const valorItem = (Number(resultado[0].preco) * quantidade).toFixed(2); //tranforma em número caso vá um texto por exemplo, então mulitplica o preço pela quantidade
            console.log(pedidoId, produtoId, quantidade, valorItem)
            const itemPedido = ItensPedido.criar({ pedidoId, produtoId, quantidade, valorItem });
            console.log(itemPedido)
            const result = await itensPedidoRepository.criar(itemPedido);
            res.status(201).json({ result });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar pedido",
                error: error.message
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = req.params.id; //utiliza o id 
            const { quantidade } = req.body;

            const result = await itensPedidoRepository.atualizar(id, quantidade); //só pode atualizar a quantidade

            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar item",
                error: error.message
            });
        }
    },

    deletar: async (req, res) => {//Apaga o item do banco de dados; 
        try {
            const id = req.params.id;

            const result = await itensPedidoRepository.deletar(id);//Chama a função que deleta no banco; 

            return res.json({
                message: "Item deletado com sucesso",
                result
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar item",
                error: error.message
            });
        }
    }
};

export default pedidoController;