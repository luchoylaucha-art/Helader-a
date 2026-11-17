import { UserModel } from "./user.model";

interface DatosUsuario {
    nombre: string;
    email: string;
    password: string;
    rol?: "admin" | "user";
}

export const buscarTodos = () => UserModel.find();

export const buscarPorId = (id: string) => UserModel.findById(id);

export const buscarPorEmail = (email: string) =>
    UserModel.findOne({ email: email.toLowerCase() }).select("+password");

export const crear = (datos: DatosUsuario) => UserModel.create(datos);

export const actualizar = (id: string, datos: Partial<DatosUsuario>) =>
    UserModel.findByIdAndUpdate(id, datos, { new: true, runValidators: true });

export const eliminar = (id: string) => UserModel.findByIdAndDelete(id);