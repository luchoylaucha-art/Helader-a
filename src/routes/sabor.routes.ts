import { Router } from "express";

import {
    obtenerSabores,
    obtenerSaborPorId
} from "../controllers/sabor.controller";

const router = Router();

router.get("/", obtenerSabores);

router.get("/:id", obtenerSaborPorId);

export default router;