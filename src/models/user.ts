export interface User {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: "admin" | "user";
}

//admin = administrador de la heladería
//user = cliente de la heladería