export interface Pedido{
    id: number;
    usuarioId: number;
    presentacionId: number;
    sabores: number[];
    estado: "Pendiente" | "Preparado" | "Entregado";
}