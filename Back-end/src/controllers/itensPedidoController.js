import { ItensPedido } from "../models/ItensPedido.js"
import { Pedido } from "../models/Pedido.js";
import itensPedidoRepository from "../repositories/itensPedidoRepository.js";
import produtoRepository from "../repositories/produtoRepository.js";

const pedidoController = {

    criar: async (req, res) => {
        try {
            let { pedidoId, produtoId, quantidade } = req.body
            const resultado = await produtoRepository.selecionarValor(produtoId);
            const valorItem = (Number(resultado[0].preco) * quantidade).toFixed(2);
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
            const id = req.params.id;
            const { quantidade } = req.body;

            const result = await itensPedidoRepository.atualizar(id, quantidade);

            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar item",
                error: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;

            const result = await itensPedidoRepository.deletar(id);

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