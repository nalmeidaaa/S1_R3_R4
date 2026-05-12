Desenvolver uma API REST utilizando JavaScript com Node.js para atender o sistema de e-commerce, permitindo integração com o front-end para consulta de produtos, gerenciamento do carrinho e registro de pedidos.

Resultados Esperados:
Disponibilizar dados de produtos para o front-end;
Permitir o registro de pedidos realizados no sistema;
 Validar dados recebidos nas requisições;
Organizar o projeto em estrutura modular e reutilizável;
Garantir persistência e integridade das informações;
Retornar respostas em formato JSON;
Integrar corretamente com o front-end.
Desenvolver API funcional
Tarefas: 

A atividade deverá ser realizada em grupos, conforme orientação do instrutor.

Cada grupo atuará como uma equipe de desenvolvimento back-end responsável pela construção da API REST do sistema de e-commerce.

A API deverá fornecer endpoints para gerenciamento de produtos e pedidos, permitindo integração completa com o front-end.

       A API deverá permitir:
Listagem de produtos;
Consulta de produto por ID;
Cadastro, edição e remoção de produtos;
Registro de pedidos enviados pelo front-end;
Consulta de pedidos cadastrados;
Cálculo automático do valor total da compra;
Validação de estoque durante a finalização do pedido;
Retorno de dados em formato JSON.
      Dados dos Produtos:
ID;
Nome;
Descrição;
Preço;
Imagem;
Quantidade em estoque;
Categoria.  (Tabela Categorias)
     Cada pedido deverá possuir:
ID;
Data do pedido;
Lista de produtos;  (Tabela Itens)
Quantidade dos itens;
Valor total;
Status do pedido.
 - Utilize de variáveis de ambiente (.env);
 - Implementação de CORS;
 - Crie a documentação da API através de arquivo readme.md;

Ferramentas:
Notebook com acesso à internet.
Visual Studio Code.
Git e GitHub
Arquivos para validar a entrega:
Entregar link do projeto no GitHub.
Entregar projeto em formato compactado aqui na plataforma.
Entregar diagrama do MySql (.mwb) e PNG;
Realizar testes através do Insomnia e salvar arquivo na pasta docs;