import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const POST_POKEMON = "POST_POKEMON";

export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_ATTACK = "ORDER_ATTACK";

export const getAllPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/pokemons");
    const pokemons = apiData.data;
    dispatch({ type: GET_ALL_POKEMONS, payload: pokemons });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
      const pokemon = apiData.data;
      return dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon });
    } catch (error) {
      console.log(error);
    }
  };
};



export const getPokemonByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/pokemons?name=${name}`
    );
    const pokemonsByName = apiData.data;
    dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonsByName });
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    const typesData = await axios.get("http://localhost:3001/types");
    const types = typesData.data;
    dispatch({ type: GET_ALL_TYPES, payload: types });
  };
};

export const postPokemon = (payload) => {
  return async function (dispatch) {
    const postPokemon = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    console.log(postPokemon);
    return postPokemon;
  };
};

export const filterPokemonsByTypes = (types) => {
  return {
    type: FILTER_BY_TYPE,
    payload: types,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const orderALphabetic = (payload) => {
  return {
    type: ORDER_ALPHABETIC,
    payload,
  };
};

export const orderByAttack = (payload) => {
  return {
    type: ORDER_ATTACK,
    payload,
  };
};
