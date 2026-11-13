import { Pedido } from "../models/pedido";
import { obtenerUsuarioPorIdService } from "../components/user/user.service";

const pedidos: Pedido[] = [];

export const obtenerTodosLosPedidos = ()=>{
    return pedidos;
};

export const obtenerPedidosPorIdService = ( id:number)=>{
    return pedidos.find(pedido => pedido.id === id);
        
};

export const crearPedidoService = (nuevoPedido: Pedido)=>{
    
    if (nuevoPedido.sabores.length === 0){
        throw new Error ("Debe seleccionar al menos un sabor");
    }

    if (nuevoPedido.sabores.length > 4){
        throw new Error
    }

    if (nuevoPedido.presentacionId === 1 && nuevoPedido.sabores.length > 2){
        throw new Error ("1/4 Kg. permite máximo 2 sabores");
    }

    if (nuevoPedido.presentacionId === 2 && nuevoPedido.sabores.length > 3){
        throw new Error ("1/2 Kg. permite máximo 3 sabores");
    }

    if (nuevoPedido.presentacionId === 3 && nuevoPedido.sabores.length > 4){
        throw new Error ("1 Kg. permite máximo 4 sabores");
    }

const usuario = obtenerUsuarioPorIdService(nuevoPedido.usuarioId);

if (!usuario){
    throw new Error("El usuario no existe");
}

    pedidos.push(nuevoPedido);
    return nuevoPedido;
}

export const actualizarPedidoService = (id:number, datosActualizados: Partial<Pedido>)=>{
    const pedido = pedidos.find(p => p.id === id);

    if (!pedido) {
        return null;
    }
    Object.assign(pedido, datosActualizados);
    return pedido;
};

export const eliminarPedidoService = (id:number, )=>{
    const indice = pedidos.findIndex(p => p.id === id);

if (indice === -1){
    return null;
}
return pedidos.splice(indice,1)[0];
}



 