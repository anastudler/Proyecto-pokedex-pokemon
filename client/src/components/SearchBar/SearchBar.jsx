import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setPokemonName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(pokemonName));
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
