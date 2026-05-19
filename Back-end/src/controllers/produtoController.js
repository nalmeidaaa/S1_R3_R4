// Listagem de produtos;
// Consulta de produto por ID;
// Cadastro, edição e remoção de produtos;

import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    // Criar produto com imagem obrigatória
    criar: async (req, res) => {
        try {

            const {
                idCategoria,
                nome,
                descricao,
                preco,
                quantidade_estoque
            } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    message: "Imagem é obrigatória."
                });
            }

            const caminho_imagem = req.file.filename;

            const produto = Produto.criar({
                idCategoria,
                nome,
                descricao,
                preco,
                quantidade_estoque,
                caminho_imagem
            });

            const result = await produtoRepository.criar(produto);

            res.status(201).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    // Editar produto sem alterar imagem
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const {idCategoria, nome, descricao, preco, quantidade_estoque} = req.body;
            const produto = Produto.alterar({idCategoria, nome, descricao, preco, quantidade_estoque, caminho_imagem: undefined }, id); //vai alterar tudo que está listadp
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor',errorMessage: error.message });
        }
    },

    //Deleta o produto
    deletar: async (req, res) => {
        try { const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    //seleciona todos os produtos existentes
    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },


    //seleciona um produto específico usando o seu ID
    selecionarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const produto = await produtoRepository.selecionarUm(id);

            if (!produto || produto.length === 0) { //Se o produto não existir ele dá erro
                return res.status(404).json({
                    message: "Produto não encontrado."
                });
            }
            res.status(200).json({
                produto: produto[0]
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    }
};

export default produtoController;