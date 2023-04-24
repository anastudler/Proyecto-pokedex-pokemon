const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getpokemonHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
} = require("../handlers/pokemonHandlers");

const pokemonRouter = Router();

// Route de pokemon?name=""
pokemonRouter.get("/", getpokemonHandler);

pokemonRouter.get("/:id", getPokemonByIdHandler);

pokemonRouter.post("/", createPokemonHandler);

module.exports = pokemonRouter;
