import { isValidObjectId } from "mongoose";
import * as pedidoRepository from "./pedido.repository";
import * as userRepository from "../user/user.repository";
import { PRESENTACIONES, ESTADOS, Presentacion, Estado } from "./pedido.model";

export class ErrorDeValidacion extends Error {}

const MAX_SABORES: Record<Presentacion, number> = {
    "1/4 kg": 2,
    "1/2 kg": 3,
    "1 kg": 4
};

const validarId = (id: string) => {
    if (!isValidObjectId(id)) {
        throw new ErrorDeValidacion("El id no es válido");
    }
};

const validarPresentacion = (presentacion: string) => {
    if (!(PRESENTACIONES as readonly string[]).includes(presentacion)) {
        throw new ErrorDeValidacion("La presentación no es válida");
    }
};

const validarSabores = (presentacion: Presentacion, sabores: string[]) => {
    if (!Array.isArray(sabores) || sabores.length === 0) {
        throw new ErrorDeValidacion("Debe seleccionar al menos un sabor");
    }
    if (sabores.length > MAX_SABORES[presentacion]) {
        throw new ErrorDeValidacion(
            `${presentacion} permite máximo ${MAX_SABORES[presentacion]} sabores`
        );
    }
    if (new Set(sabores).size !== sabores.length) {
        throw new ErrorDeValidacion("No se pueden repetir sabores");
    }
};

export const obtenerTodosLosPedidos = async () => {
    return pedidoRepository.buscarTodos();
};

export const obtenerPedidosPorIdService = async (id: string) => {
    validarId(id);
    return pedidoRepository.buscarPorId(id);
};

export const crearPedidoService = async (datos: {
    usuario: string;
    presentacion: Presentacion;
    sabores: string[];
}) => {
    validarId(datos.usuario);
    validarPresentacion(datos.presentacion);
    validarSabores(datos.presentacion, datos.sabores);

    const usuario = await userRepository.buscarPorId(datos.usuario);
    if (!usuario) {
        throw new ErrorDeValidacion("El usuario no existe");
    }

    return pedidoRepository.crear({
        usuario: datos.usuario,
        presentacion: datos.presentacion,
        sabores: datos.sabores
    });
};

export const actualizarPedidoService = async (
    id: string,
    datos: { presentacion?: Presentacion; sabores?: string[]; estado?: Estado }
) => {
    validarId(id);

    const actual = await pedidoRepository.buscarPorId(id);
    if (!actual) {
        return null;
    }

    const presentacion = datos.presentacion ?? actual.presentacion;
    const sabores = datos.sabores ?? actual.sabores;
    validarPresentacion(presentacion);
    validarSabores(presentacion, sabores);

    if (datos.estado !== undefined && !(ESTADOS as readonly string[]).includes(datos.estado)) {
        throw new ErrorDeValidacion("El estado no es válido");
    }

    const cambios: { presentacion?: Presentacion; sabores?: string[]; estado?: Estado } = {};
    if (datos.presentacion !== undefined) cambios.presentacion = datos.presentacion;
    if (datos.sabores !== undefined) cambios.sabores = datos.sabores;
    if (datos.estado !== undefined) cambios.estado = datos.estado;

    return pedidoRepository.actualizar(id, cambios);
};

export const eliminarPedidoService = async (id: string) => {
    validarId(id);
    return pedidoRepository.eliminar(id);
};




 