const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require("axios");
// const { Pokemon, Type } = require("../db");

// const typeRouter = require("./typeRouter");
const pokemonRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonRouter);
router.use("/types", typeRouter);

// router.use('/types', typeRouter);


module.exports = router;
