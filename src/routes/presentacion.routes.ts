import {Router} from "express";

import { obtenerPresentaciones, 
    obtenerPresentacionPorId,
    crearPresentacion,
    actualizarPresentacion,
    eliminarPresentacion
 } from "../controllers/presentacion.controller";

    const router = Router();

    router.get("/", obtenerPresentaciones);
    router.get("/:id", obtenerPresentacionPorId);
    router.post("/", crearPresentacion);
    router.put("/:id", actualizarPresentacion);
    router.delete("/:id", eliminarPresentacion);  

    export default router;
