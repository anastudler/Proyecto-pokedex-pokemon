import React from "react";
import style from "./Filters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {
  getAllPokemons,
  getAllTypes,
  filterPokemonsByTypes,
  filterByOrigin,
  orderALphabetic,
  orderByAttack,
} from "../../redux/actions";

const Filters = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  const filterTypesHandler = (e) => {
    dispatch(filterPokemonsByTypes(e.target.value));
  };

  const filterOriginHandler = (e) => {
    dispatch(filterByOrigin(e.target.value));
  };

  const alphabeticHandler = (e) => {
    dispatch(orderALphabetic(e.target.value));
  };

  const orderByAttackHandler = (e) => {
    dispatch(orderByAttack(e.target.value));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllPokemons());
  };

  return (
    <div className={style.allFilters}>
      <div className={style.buttonVerTodos}>
        <button onClick={(e) => handleClick(e)}>Ver Todos</button>
      </div>
      <div>
      <SearchBar />
      </div>
      <div>
        <div className={style.filter}>
          <h5>Origen:</h5>
          <select
            name="origin"
            onChange={filterOriginHandler}
            className={style.selectFilter}
          >
            <option value="All">Seleccionar</option>
            <option value="api">Api</option>
            <option value="db">Base de Datos</option>
          </select>
        </div>

        <div className={style.filter}>
          <h5>Tipo:</h5>
          <select
            name="type"
            onChange={filterTypesHandler}
            className={style.selectFilter}
          >
            <option>Seleccionar</option>
            {types.map((type, index) => {
              return (
                <option key={index} value={type.name}>
                  {type.name[0].toUpperCase() + type.name.substring(1)}
                </option>
              );
            })}
          </select>
        </div>

        <div className={style.filter}>
          <h5>Orden Alfabetico:</h5>
          <select
            name="alphabetic"
            onChange={alphabeticHandler}
            className={style.selectFilter}
          >
            <option value="All">Seleccionar</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div className={style.filter}>
          <h5>Ataque:</h5>
          <select
            name="attack"
            onChange={orderByAttackHandler}
            className={style.selectFilter}
          >
            <option value="All">Seleccionar</option>
            <option value="min">Mínimo</option>
            <option value="max">Máximo</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
