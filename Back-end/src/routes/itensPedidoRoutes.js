import { Router } from "express";
import itensPedidoController from "../controllers/itensPedidoController.js";
const itensPedidoRoutes = Router();

itensPedidoRoutes.post('/', itensPedidoController.criar);
itensPedidoRoutes.put('/:id', itensPedidoController.atualizar);
itensPedidoRoutes.delete('/:id', itensPedidoController.deletar);

export default itensPedidoRoutes;