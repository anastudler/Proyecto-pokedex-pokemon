const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Crea un pokemon nuevo!!
const createPokemon = async (pokemonData) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    pokemonData;

  const [newPokemon, created] = await Pokemon.findOrCreate({
    where: { name },
    defaults: { name, image, hp, attack, defense, speed, height, weight },
  });

  if (!created)
    throw new Error("No se puede crear dos pokemons o más con el mismo nombre");

  // busca los tipos y los agrega al pokemon
  const typeInstances = await Type.findAll({
    where: { name: types },
  });
  await newPokemon.setTypes(typeInstances);

  return newPokemon;
};

// Crea un array con estos datos vacios para poder usar con la api
const cleanInfo = (obj) => {
  return {
    id: obj.id,
    name: obj.name,
    image: obj.sprites.other.dream_world.front_default,
    hp: obj.stats[0].base_stat,
    attack: obj.stats[1].base_stat,
    defense: obj.stats[2].base_stat,
    speed: obj.stats[5].base_stat,
    height: obj.height,
    weight: obj.weight,
    types: obj.types.map((elem) => elem.type.name),
    created: false,
  };
};

// Trae la info del pokemon por id, sea de la api o de la BDD
const getPokemonById = async (id, source) => {
  let pokemon;
  if (source === "bdd") {
    const pokemonDb = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    pokemon = {
      ...pokemonDb.toJSON(),
      types: pokemonDb.types.map((e) => e.name),
    };
  } else {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon = cleanInfo(response.data);
  }
  return pokemon;
};

// Trae los elementos con la cleanInfo de 5 paginas de la api de pokemon más lo creado en la base de datos.
const getAllPokemons = async () => {
  const pokemonsRawApi = [];

  let count = 0;

  let url = "https://pokeapi.co/api/v2/pokemon";

  while (count < 6) {
    const { data } = await axios.get(url);

    pokemonsRawApi.push(...data.results);

    url = data.next;

    count++;
  }

  const apiResultRaw = await Promise.all(
    pokemonsRawApi.map(async (elem) => {
      const response = await axios.get(elem.url);
      return response.data;
    })
  );

  const apiResult = apiResultRaw.map((elem) => cleanInfo(elem));

  const dbResultsRaw = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbResults = dbResultsRaw.map((elem) => ({
    ...elem.toJSON(),
    types: elem.types.map((e) => e.name),
  }));

  return [...dbResults, ...apiResult];
};

const getAllPokemonsByNameInDb = async (name) => {
  const dbResultsRaw = await Pokemon.findAll({
    where: { name },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbResults = dbResultsRaw.map((elem) => ({
    ...elem.toJSON(),
    types: elem.types.map((e) => e.name),
  }));

  return dbResults;
};
// Lo que me pidieron hacer en la revision del pi
// const getAllPokemonsBySpeed = async (speed) => {
//   const results = [];
//   try {
//     const apiResultsRaw = (
//       await axios.get(`https://pokeapi.co/api/v2/pokemon?speed=${speed}`)
//     ).data;
//     const apiResults = cleanInfo(apiResultsRaw);
//     results.push(apiResults);
//     return results;
//   } catch (error) {
//     return error;
//   }
// };

const getAllPokemonsByNameInApi = async (name) => {
  const results = [];
  try {
    const apiResultsRaw = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    ).data;
    const apiResults = cleanInfo(apiResultsRaw);
    results.push(apiResults);
    return results;
  } catch (error) {
    return error;
  }
};
module.exports = {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getAllPokemonsByNameInDb,
  getAllPokemonsByNameInApi,
  // getAllPokemonsBySpeed,
};
