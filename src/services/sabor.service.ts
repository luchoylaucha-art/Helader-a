import { Sabor } from "../models/sabor";
// Simulando una base de datos en memoria
const sabores: Sabor[] = [
    {
        id: 1,
        nombre: "Vainilla",
        categoria: "crema",
        disponible: true
    },
    {
        id: 2,
        nombre: "Chocolate",
        categoria: "crema",
        disponible: true
    },
    {
        id: 3,
        nombre: "Frutilla",
        categoria: "crema",
        disponible: true
    }
];
//obtener todos los sabores
export const obtenerTodosLosSabores = () => {
    return sabores;
}
//obtener sabor por id
export const obtenerSaborPorIdService = (id: number) => {
    return sabores.find(s => s.id === id);
}
//crear sabor
export const crearSaborService = (nuevoSabor:Sabor) => {
       
    // Validar que el nombre del sabor no esté vacío y que no exista otro sabor con el mismo nombre
    if (!nuevoSabor.nombre.trim()) {
        throw new Error("El nombre del sabor es obligatorio");
    }
    const saborExistente = sabores.find(s => s.nombre.toLowerCase() === nuevoSabor.nombre.toLowerCase());
    if (saborExistente) {
        throw new Error("El sabor ya existe");
    }
    sabores.push(nuevoSabor);
    return nuevoSabor;
}
//actualizar sabor
export const actualizarSaborService = (id: number,
    datosActualizados: Partial<Sabor>) => {
        const sabor = sabores.find(s => s.id === id);
        if (!sabor) {
            return null;
        }
        
        Object.assign(sabor, datosActualizados);
        return sabor;
    }
    //eliminar sabor
export const eliminarSaborService = (id: number) => {

    const indice = sabores.findIndex(s => s.id === id);

    if (indice === -1) {
        return null;
    }

    return sabores.splice(indice, 1)[0];
};





