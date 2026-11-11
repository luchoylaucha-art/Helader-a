import { Request, Response } from "express";

import {
    obtenerTodasLasPresentaciones,
    obtenerPresentacionPorIdService,
    crearPresentacionService,
    actualizarPresentacionService,
    eliminarPresentacionService
    
} from "../services/presentacion.service";

//obtener todas las presentaciones
export const obtenerPresentaciones = (req: Request, res: Response) => {
    try {
        const presentaciones = obtenerTodasLasPresentaciones();
        res.json(presentaciones);

    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al obtener las presentaciones" });
    }
};

export const obtenerPresentacionPorId = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const presentacion = obtenerPresentacionPorIdService(id);
        if (!presentacion) {
            return res.status(404).json({ mensaje: "Presentación no encontrada" });
        }
        res.json(presentacion);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al obtener la presentación" });
    }
};
export const crearPresentacion = (req: Request, res: Response) => {
    try {
        const presentacion = crearPresentacionService(req.body);
        res.status(201).json({
            mensaje: "Presentación creada",
            presentacion
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear la presentación",
        })
    }
};

export const actualizarPresentacion = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const presentacion = actualizarPresentacionService(id, req.body);
        if (!presentacion) {
            return res.status(404).json({ mensaje: "Presentación no encontrada" });
        }
        res.json({
            mensaje: "Presentación actualizada",
            presentacion
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar la presentación",
        })
    }
};
export const eliminarPresentacion = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const presentacion = eliminarPresentacionService(id);
        if (!presentacion) {
            return res.status(404).json({ mensaje: "Presentación no encontrada" });
        }
        res.json({
            mensaje: "Presentación eliminada",
            presentacion
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la presentación",
        })
    }
};
