import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_ALL_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  ORDER_ALPHABETIC,
  ORDER_ATTACK,
  POST_POKEMON,
} from "./actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  pokemonById: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemonById: action.payload };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };

    case GET_ALL_TYPES:
      return { ...state, types: action.payload };

    case POST_POKEMON:
      return {
        ...state,
      };

    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: [...state.allPokemons].filter((elem) =>
          elem.types.includes(action.payload)
        ),
      };
    case FILTER_BY_ORIGIN:
      const originFilter =
        action.payload === "db"
          ? [...state.allPokemons].filter((elem) => elem.created)
          : [...state.allPokemons].filter((elem) => !elem.created);
      return {
        ...state,
        pokemons:
          action.payload === "All" ? [...state.allPokemons] : originFilter,
      };

    case ORDER_ALPHABETIC:
      const orderAlpha =
        action.payload === "asc"
          ? [...state.pokemons].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.pokemons].sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons:
          action.payload === "All" ? [...state.allPokemons] : orderAlpha,
      };
    case ORDER_ATTACK:
      const orderAttack =
        action.payload === "min"
          ? [...state.pokemons].sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : [...state.pokemons].sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons:
          action.payload === "All" ? [...state.allPokemons] : orderAttack,
      };
    //   case CLEAN_POKEMON_DETAIL:
    //     return { ...state, pokemonById: {} };
    //   case CLEAN_POKEMONS:
    //     return { ...state, pokemons: [] };
    //   case CLEAN_POKEMONS_BY_NAME:
    //     return { ...state, pokemonsByName: [] };
    //   case ORDER_BY_DB:
    //     return {
    //       ...state,
    //       pokemonsByOrigin: [...state.pokemons].filter(
    //         (elem) => elem.created === true
    //       ),
    //     };
    //   case ORDER_BY_API:
    //     return {
    //       ...state,
    //       pokemonsByOrigin: [...state.pokemons].filter(
    //         (elem) => elem.created === false
    //       ),
    //     };
    //   case CLEAN_POKEMONS_ORIGIN:
    //     return { ...state, pokemonsByOrigin: [] };
    //   case ORDER_BY_TYPE:
    //     return {
    //       ...state,
    //       pokemonsByType: [...state.pokemons].filter((elem) =>
    //         elem.types.includes(action.payload)
    //       ),
    //     };
    //   case CLEAN_POKEMONS_BY_TYPE:
    //     return { ...state, pokemonsByType: [] };
    //   case ORDER_ALPH_ASC:
    //     return {
    //       ...state,
    //       pokemonsAlphAsc: [...state.pokemons].sort((a, b) => {
    //         if (a.name === b.name) return 0;
    //         if (a.name < b.name) return -1;
    //         return 1;
    //       }),
    //     };
    //   case CLEAN_ORDER_ALPH_ASC:
    //     return { ...state, pokemonsAlphAsc: [] };
    //   case ORDER_ALPH_DES:
    //     return {
    //       ...state,
    //       pokemonsAlphDes: [...state.pokemons].sort((a, b) => {
    //         if (a.name === b.name) return 0;
    //         if (a.name > b.name) return -1;
    //         return 1;
    //       }),
    //     };
    //   case CLEAN_ORDER_ALPH_DES:
    //     return { ...state, pokemonsAlphDes: [] };
    //   case ORDER_ATTACK_MIN:
    //     return {
    //       ...state,
    //       pokemonsAttackMin: [...state.pokemons].sort((a, b) => {
    //         if (a.attack === b.attack) return 0;
    //         if (a.attack < b.attack) return -1;
    //         return 1;
    //       }),
    //     };
    //   case CLEAN_ORDER_ATTACK_MIN:
    //     return { ...state, pokemonsAttackMin: [] };
    //   case ORDER_ATTACK_MAX:
    //     return {
    //       ...state,
    //       pokemonsAttackMax: [...state.pokemons].sort((a, b) => {
    //         if (a.attack === b.attack) return 0;
    //         if (a.attack > b.attack) return -1;
    //         return 1;
    //       }),
    //     };
    //   case CLEAN_ORDER_ATTACK_MAX:
    //     return { ...state, pokemonsAttackMax: [] };
    default:
      return { ...state };
  }
};

export default reducer;
