import { Pedido } from "../models/pedido";

const pedidos: Pedido[] = [];

export const obtenerTodosLosPedidos = ()=>{
    return pedidos;
};

export const obtenerPedidosPorIdService = ( id:number)=>{
    return pedidos.find(pedido => pedido.id === id);
        
};

export const crearPedidoService = (nuevoPedido: Pedido)=>{
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
 