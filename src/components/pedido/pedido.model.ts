export interface Pedido{
    id: number;
    usuarioId: number;
    presentacionId: number;
    sabores: number[];
    estado: "Pendiente" | "Preparado" | "Entregado";
}

import { Schema, model } from "mongoose";

export const PRESENTACIONES = ["1/4 kg", "1/2 kg", "1 kg"] as const;
export const ESTADOS = ["Pendiente", "Preparado", "Entregado"] as const;
export type Presentacion = typeof PRESENTACIONES[number];
export type Estado = typeof ESTADOS[number];

const pedidoSchema = new Schema(
    {
        usuario: { type: Schema.Types.ObjectId, ref: "User", required: true },
        presentacion: { type: String, enum: [...PRESENTACIONES], required: true },
        sabores: { type: [String], required: true },
        estado: { type: String, enum: [...ESTADOS], default: "Pendiente" }
    },
    { timestamps: true }
);

export const PedidoModel = model("Pedido", pedidoSchema);