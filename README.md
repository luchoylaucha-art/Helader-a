# API Heladería

API REST para gestionar pedidos de una heladería. Desarrollada con Node.js, Express, TypeScript y MongoDB (Mongoose), con autenticación mediante bcrypt y JWT.

## Tecnologías

- Node.js, Express 5 y TypeScript
- MongoDB Atlas con Mongoose
- bcrypt (hash de contraseñas) y jsonwebtoken (autenticación)
- dotenv (variables de entorno)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/luchoylaucha-art/Helader-a.git
   cd Helader-a
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz copiando `.env.example` y completar los valores:
   ```
   PORT=3000
   MONGO_URI=cadena de conexión de MongoDB Atlas
   JWT_SECRET=una clave secreta larga y aleatoria
   DNS_SERVERS=
   ```
   `DNS_SERVERS` es opcional: solo hace falta (por ejemplo `8.8.8.8,1.1.1.1`) si la conexión a Atlas falla con el error `querySrv ECONNREFUSED`.
4. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

El servidor queda disponible en `http://localhost:3000`.

## Estructura del proyecto

```
src/
  app.ts, server.ts
  config/        conexión a la base de datos
  middlewares/   autenticación (JWT), roles y logging
  utils/         errores personalizados
  components/
    auth/        registro y login
    pedido/      modelo, repository, servicio, controlador y rutas
    user/        modelo y repository de usuarios
```

Cada componente separa sus capas: rutas, controlador, servicio y acceso a datos (repository).

## Autenticación

Para usar las rutas protegidas hay que enviar el token en el encabezado:

```
Authorization: Bearer <token>
```

El token se obtiene con el login y vence a la hora. Contiene únicamente el `id` y el `rol` del usuario.

Todos los usuarios nuevos se registran con rol `user`. El rol `admin` se asigna directamente en la base de datos.

## Endpoints

### Autenticación

| Método | Ruta            | Descripción                       | Protegida |
|--------|-----------------|-----------------------------------|-----------|
| POST   | `/auth/registro`| Registra un usuario               |    No     |
| POST   | `/auth/login`   | Inicia sesión y devuelve un token |    No     |

Body de registro: `{ "nombre": "...", "email": "...", "password": "..." }` (la contraseña debe tener al menos 6 caracteres).
Body de login: `{ "email": "...", "password": "..." }`.

### Pedidos

| Método | Ruta          | Descripción                                                       | Protegida |
|--------|---------------|-------------------------------------------------------------------|-----------|
| GET    | `/pedidos`    | Lista los pedidos. Un cliente ve solo los suyos; el admin ve todos|     Sí    |
| GET    | `/pedidos/:id`| Obtiene un pedido (solo su dueño o un admin)                      |     Sí    |
| POST   | `/pedidos`    | Crea un pedido a nombre del usuario del token                     |     Sí    |
| PUT    | `/pedidos/:id`| Modifica un pedido (solo su dueño o un admin)                     |     Sí    |
| DELETE | `/pedidos/:id`| Elimina un pedido (solo admin)                                    | Sí, admin |

Filtro opcional en el listado: `GET /pedidos?estado=Pendiente`.

Body de creación: `{ "presentacion": "1/2 kg", "sabores": ["Vainilla", "Chocolate"] }`.
Body de modificación (todos los campos son opcionales): `{ "presentacion": "...", "sabores": [...], "estado": "Entregado" }`.

## Reglas de negocio

- Presentaciones válidas: `1/4 kg` (hasta 2 sabores), `1/2 kg` (hasta 3 sabores) y `1 kg` (hasta 4 sabores).
- Todo pedido necesita al menos un sabor, y no se pueden repetir sabores.
- Estados válidos: `Pendiente` (por defecto), `Preparado` y `Entregado`.

## Códigos de estado

| Código |                    Cuándo                                           |
|--------|---------------------------------------------------------------------|
|  200   | Consulta, modificación o eliminación correcta                       |
|  201   | Recurso creado                                                      |
|  400   | Datos inválidos (validaciones de negocio)                           |
|  401   | Token ausente, inválido o vencido, o credenciales incorrectas       |
|  403   | El usuario no tiene permisos (por ejemplo, eliminar sin ser admin)  |
|  404   | El recurso no existe, o no pertenece al usuario                     |
|  500   | Error interno del servidor                                          |