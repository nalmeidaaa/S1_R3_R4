import { connection } from "../configs/Database.js";

const pedidoRepository = {

    criar: async (pedido) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = `INSERT INTO pedidos(subtotal, status, quantidade_itens) VALUES (?, ?, ?)`;
            const values = [pedido.subTotal, pedido.status, pedido.quantidade_itens];
            const [rows] = await connection.execute(sql, values);

            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    atualizar: async (pedido) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = `UPDATE pedidos SET status = ? WHERE id_pedido = ?`;
            const values = [pedido.status, pedido.id];
            const [rows] = await connection.execute(sql, values);

            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = 'DELETE FROM pedidos WHERE id = ?';
            const values = [id];
            const [rows] = await connection.execute(sql, values);

            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {

        const conn = await connection.getConnection();

        try {

            const sql = `
            SELECT
                p.id_pedido,
                p.subTotal,
                p.quantidade_itens,
                p.status,
                p.dataCad,

                ip.idItem,
                ip.produtoId,
                ip.quantidade,
                ip.valorItem,

                pr.nome AS nome_produto

            FROM pedidos p

            INNER JOIN itens_pedido ip
                ON ip.pedidoId = p.id_pedido

            INNER JOIN produtos pr
                ON pr.id_produto = ip.produtoId

            ORDER BY p.id_pedido DESC
        `;

            const [rows] = await conn.execute(sql);

            const pedidos = [];

            rows.forEach(row => {

                let pedido = pedidos.find(
                    p => p.id_pedido === row.id_pedido
                );

                if (!pedido) {

                    pedido = {
                        id_pedido: row.id_pedido,
                        id_cliente: row.id_cliente,
                        subTotal: row.subTotal,
                        quantidade_itens: row.quantidade_itens,
                        status: row.status,
                        dataCad: row.dataCad,
                        itens: []
                    };

                    pedidos.push(pedido);

                }

                pedido.itens.push({
                    idItem: row.idItem,
                    produtoId: row.produtoId,
                    nome_produto: row.nome_produto,
                    quantidade: row.quantidade,
                    valorItem: row.valorItem
                });

            });

            return pedidos;

        } catch (error) {

            throw error;

        } finally {

            conn.release();

        }

    },

    selecionarUm: async (id) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = 'SELECT * FROM pedidos WHERE id = ?';
            const values = [id];
            const [rows] = await connection.execute(sql, values);

            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

};

export default pedidoRepository;