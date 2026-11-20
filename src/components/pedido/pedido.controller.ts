import { Request, Response } from "express";
import {
    obtenerTodosLosPedidos,
    obtenerPedidosPorIdService,
    crearPedidoService,
    actualizarPedidoService,
    eliminarPedidoService
   } from "./pedido.service";

   import { ErrorDeValidacion } from "../../utils/errores";

const responderError = (res: Response, error: unknown, mensajeGenerico: string) => {
    if (error instanceof ErrorDeValidacion) {
        res.status(400).json({ mensaje: error.message });
        return;
    }
    console.error(error);
    res.status(500).json({ mensaje: mensajeGenerico });
};

export const obtenerPedidos = async (req: Request, res: Response) => {
    try {
        const estado = typeof req.query.estado === "string" ? req.query.estado : undefined;
const pedidos = await obtenerTodosLosPedidos(res.locals.usuario, { estado });
        res.status(200).json(pedidos);
    } catch (error) {
        responderError(res, error, "Error al obtener los pedidos");
    }
};

export const obtenerPedidosPorId = async (req: Request, res: Response) => {
    try {
        const pedido = await obtenerPedidosPorIdService(String(req.params.id), res.locals.usuario);
        if (!pedido) {
            res.status(404).json({ mensaje: "Pedido no encontrado" });
            return;
        }
        res.status(200).json(pedido);
    } catch (error) {
        responderError(res, error, "Error al obtener el pedido");
    }
};

export const crearPedido = async (req: Request, res: Response) => {
    try {
        const pedido = await crearPedidoService({
    presentacion: req.body?.presentacion,
    sabores: req.body?.sabores,
    usuario: res.locals.usuario.id
});
        res.status(201).json({ mensaje: "Pedido creado", pedido });
        
    } catch (error) {
        responderError(res, error, "Error al crear el pedido");
    }
};

export const actualizarPedido = async (req: Request, res: Response) => {
    try {
        const pedido = await actualizarPedidoService(String(req.params.id), req.body, res.locals.usuario);
        if (!pedido) {
            res.status(404).json({ mensaje: "Pedido no encontrado" });
            return;
        }
        res.status(200).json({ mensaje: "Pedido actualizado", pedido });
    } catch (error) {
        responderError(res, error, "Error al actualizar el pedido");
    }
};

export const eliminarPedido = async (req: Request, res: Response) => {
    try {
        const pedido = await eliminarPedidoService(String(req.params.id));
        if (!pedido) {
            res.status(404).json({ mensaje: "Pedido no encontrado" });
            return;
        }
        res.status(200).json({ mensaje: "Pedido eliminado", pedido });
    } catch (error) {
        responderError(res, error, "Error al eliminar el pedido");
    }
};