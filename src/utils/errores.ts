// Error de datos inválidos enviados por el cliente (responde 400)
export class ErrorDeValidacion extends Error {}

// Error de credenciales o token inválidos (responde 401)
export class ErrorDeAutenticacion extends Error {}
