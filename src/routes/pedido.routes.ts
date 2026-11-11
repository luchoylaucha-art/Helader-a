import { Router } from "express";

import{
    obtenerPedidos,
    obtenerPedidosPorId,
    crearPedido,
    actualizarPedido,
    eliminarPedido
} from "../controllers/pedidos.controller";

const router = Router();

router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedidosPorId);
router.post("/", crearPedido);
router.put("/:id", actualizarPedido);
router.delete("/:id", eliminarPedido);

export default router;
