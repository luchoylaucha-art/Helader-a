import { Schema, model } from "mongoose";

export interface User {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: "admin" | "user";
}

const userSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        rol: { type: String, enum: ["admin", "user"], default: "user" }
    },
    { timestamps: true }
);

export const UserModel = model("User", userSchema);

//admin = administrador de la heladería
//user = cliente de la heladería