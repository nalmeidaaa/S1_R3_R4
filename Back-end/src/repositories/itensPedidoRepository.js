import { connection } from "../configs/Database.js";

const itensPedidoRepository = {

    criar: async (itemPedido) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            // INSERT ITEM
            const sql = `
                INSERT INTO itens_pedido 
                (pedidoId, produtoId, quantidade, valorItem) VALUES (?, ?, ?, ?)`;

            const values = [itemPedido.pedidoId, itemPedido.produtoId, itemPedido.quantidade,itemPedido.valorItem];

            const [result] = await conn.execute(sql, values);

            // RECALCULAR SUBTOTAL
            await recalcularSubtotal(conn, itemPedido.pedidoId);
            await conn.commit(); //salvar definitivamente todas as alterações feitas no banco de dados 
            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }

    },

  atualizar: async (id, quantidade) => {
    const conn = await connection.getConnection();

    try {

        await conn.beginTransaction();

        // BUSCA ITEM + PREÇO PRODUTO
        const [itemAtual] = await conn.execute(
            `SELECT ip.pedidoId, ip.produtoId, p.preco FROM itens_pedido ip INNER JOIN produtos p ON p.id_produto = ip.produtoId WHERE ip.idItem = ?`,
            [id]
        );

        if (itemAtual.length === 0) {
            throw new Error("Item não encontrado");
        }

        const pedidoId = itemAtual[0].pedidoId;

        const precoProduto = Number(itemAtual[0].preco);

        const novoValorItem = (precoProduto * quantidade).toFixed(2);

        // ATUALIZA ITEM
        const sqlUpdate = `
            UPDATE itens_pedido 
            SET quantidade = ?, valorItem = ? WHERE idItem = ?`;

        await conn.execute(
            sqlUpdate,
            [quantidade, novoValorItem,id]);

        // RECALCULAR SUBTOTAL
        await recalcularSubtotal(
            conn,
            pedidoId
        );

        await conn.commit();

        return {id, quantidade,valorItem: novoValorItem};

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

            // PEGA pedidoId antes de deletar
            const [item] = await conn.execute(
                `SELECT pedidoId  FROM itens_pedido WHERE idItem = ?`, [id]
            );

            if (item.length === 0) {
                throw new Error("Item não encontrado");
            }

            const pedidoId = item[0].pedidoId;

            // DELETE ITEM
            await conn.execute(
                ` DELETE FROM itens_pedido WHERE idItem = ?`,[id]);

            // RECALCULAR SUBTOTAL
            await recalcularSubtotal(conn, pedidoId);

            await conn.commit();
            return { id };

        } catch (error) {
            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }

    }

};

// FUNÇÃO CENTRAL
// FUNÇÃO CENTRAL
const recalcularSubtotal = async (conn, pedidoId) => {

    const [resultado] = await conn.execute(
        `SELECT SUM(valorItem) AS subtotal,  SUM(quantidade) AS quantidadeItens  FROM itens_pedido WHERE pedidoId = ?`, [pedidoId]
    );

    const novoSubtotal = resultado[0].subtotal || 0;

    const novaQuantidadeItens = resultado[0].quantidadeItens || 0;

    await conn.execute(
        `UPDATE pedidos SET subTotal = ?,  quantidade_itens = ? WHERE id_pedido = ?`,
        [novoSubtotal, novaQuantidadeItens,pedidoId]
    );
    return {novoSubtotal, novaQuantidadeItens};
};

export default itensPedidoRepository;