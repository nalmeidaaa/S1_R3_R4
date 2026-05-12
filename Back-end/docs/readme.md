# Sistema de Pedidos

## Descrição
Projeto desenvolvido para controle de pedidos, produtos, itens e categorias de produtos para um e-commerce de livros.

## Tecnologias
- Node.js
- MySQL Workbench

## Funcionalidades
- Cadastro de produtos;
- Cadastro de pedidos;
- Cadastro de categorias;
- Controle de estoque.

## Rotas - Categorias

### Criar categoria
POST /categorias

### Editar categoria
PUT /categorias/:id

### Deletar categoria
DELETE /categoria/:id

### Listar categorias
GET /categorias

### Buscar categoria por ID
GET /categorias/:id

---

## Rotas - Produtos

### Criar produto
POST /produtos

### Editar produto
PUT /produtos/:id

### Deletar produto
DELETE /produtos/:id

### Listar produto
GET /produtos

### Buscar produto por ID
GET /produtos/:id


## Banco de Dados

**Tabelas:**
- produtos
- categorias
- pedidos
- itens_pedidos

## Autores
- Angela Barbosa Soares
- Isabeli Alexandre da Silva Araújo
- Isabelly de Assis Gonçalves
- Nicolas Almeida Barbosa
- Sabrina Fernandes Dragoneti
