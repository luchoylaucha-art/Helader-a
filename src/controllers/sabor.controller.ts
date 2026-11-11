import { request, response } from "express";
//importar sabores desde el servicio
import {
    obtenerTodosLosSabores,
    obtenerSaborPorIdService,
    crearSaborService,
    actualizarSaborService,
    eliminarSaborService
} from "../services/sabor.service";

//obtener todos los sabores
export const obtenerSabores = (req = request, res = response) => {
     try {
    const sabores = obtenerTodosLosSabores();

    res.json({
        mensaje: "Lista de sabores",
        sabores
    });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los sabores",
        });
       }
};
//obtener sabor por id
export const obtenerSaborPorId = (req = request, res = response) => {

    try{ 
    const id = Number(req.params.id);

    const sabor = obtenerSaborPorIdService(id);

    if (!sabor) {
        return res.status(404).json({
            mensaje: "Sabor no encontrado"
        });
    }

    res.json(sabor);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el sabor",
        });
    }
};
//crear sabor 
export const crearSabor = (req = request, res = response) => {
    try {
        const nuevoSabor = crearSaborService(req.body);
        res.status(201).json({
            mensaje: "Sabor creado",
            sabor: nuevoSabor
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error instanceof Error ? error.message : "Error al crear el sabor"
        });
    }
}
//actualizar sabor
export const actualizarSabor = (req = request, res = response) => {
    
    try {
    const id = Number(req.params.id);
    const sabor = actualizarSaborService(id, req.body);

    if (!sabor) {
        return res.status(404).json({
            mensaje: "Sabor no encontrado"
        });
    }

    res.json({
        mensaje: "Sabor actualizado",
        sabor
    });
    } catch (error) {
        res.status(400).json({
            mensaje:"Error al actualizar el sabor"
        });
    }
}

//eliminar sabor
export const eliminarSabor = (req = request, res = response) => {
    
    try {
    const id = Number(req.params.id);

    const saborEliminado = eliminarSaborService(id);

    if (!saborEliminado) {
        return res.status(404).json({
            mensaje: "Sabor no encontrado"
        });
    }
    res.json({
        mensaje: "Sabor eliminado",
        sabor: saborEliminado
    });
    } catch (error) {
        res.status(400).json({
            mensaje:"Error al eliminar el sabor"
        });
    }
};