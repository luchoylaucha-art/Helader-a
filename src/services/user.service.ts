import {User} from "../models/user";

//simulacion de bade de datos en memoria
const users: User[] = [
    {
        id: 1,
        nombre: "administrador",
        email: "cualquiera@gmaill.com",
        password: "123456",
        rol: "admin"
    }];

//obtener todos los usuarios
    export const obtenerTodosLosUsuariosService = () => {
        return users;
    }

    //obtener usuario por id
    export const obtenerUsuarioPorIdService = (id: number) => {
        return users.find(u => u.id === id);
    }

    //crear usuario
    export const crearUsuarioService = (nuevoUsuario:User) => {
        // Validar nombre 
        if (!nuevoUsuario.nombre.trim ()){
            throw new Error("Nombre de usuario es obligatorio");
        }
 
        // Validar email
        const emailExistente = users.find(u => u.email.toLowerCase() === nuevoUsuario.email.toLowerCase());
        if (emailExistente) {
            throw new Error("El email ya está registrado");
        }

        // Asignar un ID único (simulación)
        nuevoUsuario.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push(nuevoUsuario);
        return nuevoUsuario;
      
    };

    //actualizar usuario
    export const actualizarUsuarioService = (id: number, datosActualizados: Partial<User>) => {
        const usuario = users.find(u => u.id === id);
        if (!usuario) {
            return null;
        } 
        Object.assign(usuario, datosActualizados);
        return usuario;
    };

    //eliminar usuario
    export const eliminarUsuarioService = (id: number) => {
        const indice = users.findIndex(u => u.id === id);
        if (indice === -1) {
            return null;
        }
        return users.splice(indice, 1)[0];
    };


