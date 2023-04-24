import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paginado from "../../components/Paginado/Paginado";

const CardsContainer = () => {

  const pokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  
  const paginado = (pageNumeber) => {
    setCurrentPage(pageNumeber);
  }

  return (
    <div >
      <div>
      <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={pokemons.length} paginado={paginado} />
      </div>
      
      <div className={style.container}>
      {currentPokemons?.map((pokemon) => {
        return (
          <Card
          id={pokemon.id}
          image={pokemon.image}
          
          name={pokemon.name}
          types={pokemon.types}
          />
          );
        })}
        </div>
    </div>
  );
};

export default CardsContainer;
