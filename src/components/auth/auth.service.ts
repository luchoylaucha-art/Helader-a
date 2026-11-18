import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../user/user.repository";
import { ErrorDeValidacion, ErrorDeAutenticacion } from "../../utils/errores";

const SALT_ROUNDS = 10;

const obtenerSecreto = () => {
    const secreto = process.env.JWT_SECRET;
    if (!secreto) {
        throw new Error("Falta la variable JWT_SECRET en el archivo .env");
    }
    return secreto;
};

export const registrarService = async (datos: {
    nombre: string;
    email: string;
    password: string;
}) => {
    const { nombre, email, password } = datos;

    if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new ErrorDeValidacion("El nombre es obligatorio");
    }
    if (typeof email !== "string" || !email.includes("@")) {
        throw new ErrorDeValidacion("El email no es válido");
    }
    if (typeof password !== "string" || password.length < 6) {
        throw new ErrorDeValidacion("La contraseña debe tener al menos 6 caracteres");
    }

    const existente = await userRepository.buscarPorEmail(email);
    if (existente) {
        throw new ErrorDeValidacion("El email ya está registrado");
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const usuario = await userRepository.crear({ nombre, email, password: hash });

    return {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    };
};

export const loginService = async (datos: { email: string; password: string }) => {
    const { email, password } = datos;

    if (typeof email !== "string" || typeof password !== "string") {
        throw new ErrorDeValidacion("Email y contraseña son obligatorios");
    }

    const usuario = await userRepository.buscarPorEmail(email);
    const passwordCorrecta = usuario
        ? await bcrypt.compare(password, usuario.password)
        : false;

    if (!usuario || !passwordCorrecta) {
        throw new ErrorDeAutenticacion("Credenciales incorrectas");
    }

    const token = jwt.sign(
        { id: usuario._id.toString(), rol: usuario.rol },
        obtenerSecreto(),
        { expiresIn: 60 * 60 } // 1 hora, en segundos
    );

    return { token };
};