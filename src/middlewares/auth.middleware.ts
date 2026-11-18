import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cabecera = req.headers.authorization;

        if (!cabecera || !cabecera.startsWith("Bearer ")) {
            res.status(401).json({ mensaje: "Token no enviado" });
            return;
        }

        const token = cabecera.split(" ")[1];
        const secreto = process.env.JWT_SECRET;

        if (!secreto) {
            throw new Error("Falta la variable JWT_SECRET en el archivo .env");
        }

        const datos = jwt.verify(token, secreto) as jwt.JwtPayload;
        res.locals.usuario = { id: datos.id, rol: datos.rol };
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ mensaje: "Token inválido o vencido" });
            return;
        }
        console.error(error);
        res.status(500).json({ mensaje: "Error al verificar el token" });
    }
};