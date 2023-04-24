import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { useEffect } from "react";


const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonById);
  const id = match.params.id;

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [id, dispatch]);

  return (
    <div>
      <div>
        <p>
          {pokemon.name
            ? pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
            : null}
        </p>
        <p>#{pokemon.id}</p>
        <img src={pokemon.image} alt="pokemon" />
        <p>Vida: {pokemon.hp}</p>
        <p>Ataque: {pokemon.attack}</p>
        <p>Defensa: {pokemon.defense}</p>
        {pokemon.speed ? <p>Velocidad: {pokemon.speed}</p> : null}
        {pokemon.height ? <p>Altura: {pokemon.height}</p> : null}
        {pokemon.weight ? <p>Peso: {pokemon.weight}</p> : null}
        <p>Tipos:</p>
        {pokemon.types ? (
          <ul>
            {pokemon.types.map((type, index) => {
              return (
                <li key={index}>{type[0].toUpperCase() + type.substring(1)}</li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Detail;
