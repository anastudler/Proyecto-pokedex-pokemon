const {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  getAllPokemonsByNameInDb,
  getAllPokemonsByNameInApi,
  // getAllPokemonsBySpeed,
} = require("../controllers/pokemonControllers");

const getpokemonHandler = async (req, res) => {
  let { name, speed } = req.query;

  try {
    if (name) {
      name = name.toLowerCase();
      const allPokemonsByNameInDb = await getAllPokemonsByNameInDb(name);
      const allPokemonsByNameInApi = await getAllPokemonsByNameInApi(name);
      const results = [...allPokemonsByNameInDb, ...allPokemonsByNameInApi];

      if (results.length === 0)
        throw new Error("Ningún pokemon coincide con la búsqueda");

      res.status(200).send(results);
    }
    // if (speed) {
    //   const pokemonsBySpeed = await getAllPokemonsBySpeed(`speed=${speed}`);
    //   const results = [...pokemonsBySpeed];

    //   res.status(200).send(results);
    // }
    else {
      const allPokemons = await getAllPokemons();
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// trae pokemon por Id

const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const pokemon = await getPokemonById(id, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handler que Crea un nuevo pokemon en la Db
const createPokemonHandler = async (req, res) => {
  try {
    const pokemonData = req.body;
    if (
      !pokemonData.name ||
      !pokemonData.image ||
      !pokemonData.hp ||
      !pokemonData.attack ||
      !pokemonData.defense
    ) {
      throw new Error("Faltan datos obligatorios");
    }

    const newPokemon = await createPokemon(pokemonData);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getpokemonHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
};
