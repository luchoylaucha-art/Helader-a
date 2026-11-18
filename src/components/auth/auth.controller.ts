import { Request, Response } from "express";
import { registrarService, loginService } from "./auth.service";
import { ErrorDeValidacion, ErrorDeAutenticacion } from "../../utils/errores";

const responderError = (res: Response, error: unknown, mensajeGenerico: string) => {
    if (error instanceof ErrorDeValidacion) {
        res.status(400).json({ mensaje: error.message });
        return;
    }
    if (error instanceof ErrorDeAutenticacion) {
        res.status(401).json({ mensaje: error.message });
        return;
    }
    console.error(error);
    res.status(500).json({ mensaje: mensajeGenerico });
};

export const registrar = async (req: Request, res: Response) => {
    try {
        const usuario = await registrarService(req.body ?? {});
        res.status(201).json({ mensaje: "Usuario registrado", usuario });
    } catch (error) {
        responderError(res, error, "Error al registrar el usuario");
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const resultado = await loginService(req.body ?? {});
        res.status(200).json(resultado);
    } catch (error) {
        responderError(res, error, "Error al iniciar sesión");
    }
};