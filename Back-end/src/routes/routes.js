import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import pedidoRoutes from "./pedidoRoutes.js";

const routes = Router();

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/pedidos', pedidoRoutes);

export default routes;