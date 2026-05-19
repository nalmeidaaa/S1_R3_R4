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

---

## Rotas - Itens Pedidos 

### Criar itens pedido
POST /itensPedidos

### Editar itens pedidos 
PUT /itensPedidos/:id

### Deletar itens pedidos
DELETE /itensPedidos /:id

---

## Rotas - Pedidos

### Listar pedido
GET /pedidos

### Criar pedido
POST /pedidos

### Editar pedido 
PUT /pedidos/:id

## Banco de Dados

**Tabelas:**
- produtos
- categorias
- pedidos
- itens_pedidos

## Autores e suas funções:
- Angela Barbosa Soares: Front-end.
- Isabeli Alexandre da Silva Araújo: Banco de dados; documentação; front-end.
- Isabelly de Assis Gonçalves: Front-end.
- Nicolas Almeida Barbosa: Back-end.
- Sabrina Fernandes Dragoneti: Back-end.
