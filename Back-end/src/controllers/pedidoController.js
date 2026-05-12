import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPed } from "../enums/statusPedido.js";

const pedidoController = {

    criar: async (req, res) => {

        try {let { ClienteId, clienteId, itens } = req.body;
            if (!clienteId) {
                clienteId = ClienteId;
            }

            const quantidade_itens = itens ? itens.length : 0;
            const subTotal = 0;
            const pedido = Pedido.criar({ subTotal, status: statusPed.ABERTO, quantidade_itens});
            const result = await pedidoRepository.criar(pedido, clienteId);

            return res.status(201).json({
                result
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar pedido",
                error: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try { const result = await pedidoRepository.selecionar();
             return res.json(result);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar pedidos",
                error: error.message
            });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = req.params.id;
            let { Status, status } = req.body;

            if (!Status) {
                Status = status;
            }

            const pedido = Pedido.editar({subTotal: 0, status: Status, quantidade_itens: 0}, id);
            const result = await pedidoRepository.atualizar(pedido);
            return res.json(result);

        } catch (error) {

            return res.status(500).json({
                message: "Erro ao atualizar pedido",
                error: error.message
            });

        }

    },

    deletar: async (req, res) => {
        try {
            const idPedido = req.params.id;
            const result = await pedidoRepository.deletar(idPedido);
            return res.json({
                message: "Pedido deletado com sucesso",
                result
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar pedido",
                error: error.message
            });
        }
    }
};

export default pedidoController;