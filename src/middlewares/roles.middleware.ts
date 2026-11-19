import { Request, Response, NextFunction } from "express";

export const soloAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.usuario?.rol !== "admin") {
        res.status(403).json({ mensaje: "No tenés permisos para esta acción" });
        return;
    }
    next();
};