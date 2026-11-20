import { Router } from "express";
import {
    obtenerPedidos,
    obtenerPedidosPorId,
    crearPedido,
    actualizarPedido,
    eliminarPedido
} from "./pedido.controller";
import { verificarToken } from "../../middlewares/auth.middleware";
import { soloAdmin } from "../../middlewares/roles.middleware";

const router = Router();

router.get("/", verificarToken, obtenerPedidos);
router.get("/:id", verificarToken,obtenerPedidosPorId);
router.post("/", verificarToken, crearPedido);
router.put("/:id", verificarToken, actualizarPedido);
router.delete("/:id", verificarToken, soloAdmin, eliminarPedido);

export default router;
