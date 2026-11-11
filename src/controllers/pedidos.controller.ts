import { Request, Response } from "express";

import {
    obtenerTodosLosPedidos,
    obtenerPedidosPorIdService,
    crearPedidoService,
    actualizarPedidoService,
    eliminarPedidoService
} from "../services/pedido.service";

export const obtenerPedidos = (req: Request, res: Response) => {
    try {
        const pedidos = obtenerTodosLosPedidos();
        res.json({ mensaje: "Lista de pedidos", pedidos });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener pedidos"
        });
    }
};

export const obtenerPedidosPorId = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const pedido = obtenerPedidosPorIdService(id);

        if (!pedido) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener pedido"
        });
    }
};

export const crearPedido = (req: Request, res: Response) => {
    try{
        const pedido = crearPedidoService(req.body);
        res.status(201).json({
            mensaje: "Pedido creado",
            pedido
        });

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear pedido"
        });
    }
};

export const actualizarPedido = (req: Request, res: Response)=> {
    try {
        const id = Number(req.params.id);
        const pedido = actualizarPedidoService(id, req.body);
        
        if (!pedido) {
            return res.status(404).json({
                mensaje: "Pedido actualizado",
                pedido
            });
        }
        res.json({
            mensaje: "Pedido actualizado",
            pedido
        });
    } catch (error){
        res.status(400).json({
            mensaje: "Error al actualizar pedido"
        });
    }
};

export const eliminarPedido = (req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const pedido = eliminarPedidoService(id);

        if (!pedido){
            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });
        }
    res.json({
        mensaje: "Pedido eliminado",
        pedido});

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar pedido"
        });
    }
};
