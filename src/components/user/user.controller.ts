import { request, response } from "express";

import { 
    obtenerTodosLosUsuariosService, 
    obtenerUsuarioPorIdService, 
    crearUsuarioService, 
    actualizarUsuarioService, 
    eliminarUsuarioService 
} from "./user.service";

// obtener todos los usuarios
export const obtenerUsuarios = (req = request, res = response) => {
    try {
        const usuarios = obtenerTodosLosUsuariosService();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios" });
    }
};

// obtener usuario por id
export const obtenerUsuarioPorId = (req = request, res = response) => {
    try {
        const id = Number(req.params.id);
        const usuario = obtenerUsuarioPorIdService(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
};

// crear usuario
export const crearUsuario = (req = request, res = response) => {
    try {
        const usuario = crearUsuarioService(req.body);
        res.status(201).json({
            mensaje: "Usuario creado",
            usuario
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el usuario",
        });
    }
};

//actualizar usuario
export const actualizarUsuario = (req = request, res = response) => {
    try {
        const id = Number(req.params.id);
        const usuario = actualizarUsuarioService(id, req.body);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({
            mensaje: "Usuario actualizado",
            usuario
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el usuario",
        });
    }
};

//eliminar usuario 
export const eliminarUsuario = (req = request, res = response) => {
    try {
        const id = Number(req.params.id);
        const usuario = eliminarUsuarioService(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({
            mensaje: "Usuario eliminado",
            usuario
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el usuario",
        });
    }
};