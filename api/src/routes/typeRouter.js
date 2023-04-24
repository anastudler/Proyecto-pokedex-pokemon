const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getTypeHandler } = require("../handlers/typeHandlers");

const typeRouter = Router();

typeRouter.get("/", getTypeHandler);

module.exports = typeRouter;
