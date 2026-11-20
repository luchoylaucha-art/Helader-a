import { PedidoModel, Presentacion, Estado } from "./pedido.model";

interface DatosPedido {
    usuario: string;
    presentacion: Presentacion;
    sabores: string[];
    estado?: Estado;
}

export const buscarTodos = () => PedidoModel.find();

export const buscarPorUsuario = (usuarioId: string) =>
    PedidoModel.find({ usuario: usuarioId });

export const buscarPorId = (id: string) => PedidoModel.findById(id);

export const crear = (datos: DatosPedido) => PedidoModel.create(datos);

export const actualizar = (id: string, datos: Partial<DatosPedido>) =>
    PedidoModel.findByIdAndUpdate(id, datos, { new: true, runValidators: true });

export const eliminar = (id: string) => PedidoModel.findByIdAndDelete(id);