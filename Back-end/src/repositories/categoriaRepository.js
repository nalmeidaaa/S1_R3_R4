import { connection } from "../configs/Database.js"

const categoriaRepository = {
    criar: async (categoria) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)';
            const values = [categoria.nome, categoria.descricao];
            const [rows] = await conn.execute(sql, values);
            await conn.commit();
            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    editar: async (categoria) => {
        const conn = await connection.getConnection();
        try {
            const sql = 'UPDATE categorias SET nome=?, descricao=? WHERE id_categoria = ?';
            const values = [categoria.nome, categoria.descricao, categoria.id];
            const [rows] = await connection.execute(sql, values);
            return rows
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
            const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
            const values = [id];
            const [rows] = await connection.execute(sql, values);
            return rows
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
            const sql = 'SELECT * FROM categorias';

            const [rows] = await connection.execute(sql);
            return rows
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    selecionarUm: async (id) => {
        const conn = await connection.getConnection();
        try {
            const sql = 'SELECT * FROM categorias where id_categoria = ?';
            const values = [id]
            const [rows] = await connection.execute(sql, values);
            return rows
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default categoriaRepository;