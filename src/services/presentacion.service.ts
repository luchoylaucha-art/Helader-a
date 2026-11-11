//importar presentacion desde el modelo
import {Presentacion} from "../models/presentacion";

const presentaciones: Presentacion[] = [
    {
        id: 1,  
        nombre: "1/4 kg",
        peso: 0.25,
        precio: 4300,
        maxsabores: 2
    },
    {
        id: 2,
        nombre: "1/2 kg",
        peso: 0.5,
        precio: 7000,
        maxsabores: 3
    },
    {
        id: 3,
        nombre: "1 kg",
        peso: 1,
        precio: 11700,
        maxsabores: 4
    }
];

export const obtenerTodasLasPresentaciones = () => {
    return presentaciones;
};

export const obtenerPresentacionPorIdService = (id: number) => {
    return presentaciones.find(p => p.id === id);
}
//crear presentacion
export const crearPresentacionService = (nuevaPresentacion:Presentacion) => {
   
    if (nuevaPresentacion.precio <= 0) {
        throw new Error("El precio debe ser mayor a 0");
    }

    if (nuevaPresentacion.maxsabores < 1) {
        throw new Error("Debe haber al menos un sabor permitido");
    }

    presentaciones.push(nuevaPresentacion);
    return nuevaPresentacion;
}
    //actualizar presentacion
export const actualizarPresentacionService = (id: number,
    datosActualizados: Partial<Presentacion>) => {
        
        const presentacion = presentaciones.find(p => p.id === id);
        if (!presentacion) {
            return null;
        }
        Object.assign(presentacion, datosActualizados);
        return presentacion;
    };
export const eliminarPresentacionService = (id: number) => {

    const indice = presentaciones.findIndex(p => p.id === id);
    if (indice === -1) {
        return null;
    }
    return presentaciones.splice(indice, 1)[0];
}