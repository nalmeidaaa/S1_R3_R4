import { connection } from "../configs/Database.js";

const pedidoRepository = {

    criar: async (pedido) => {
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
        try {
            await conn.beginTransaction();
            const sql = 'SELECT * FROM pedidos';
            const [rows] = await connection.execute(sql);

            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionarUm: async (id) => {
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