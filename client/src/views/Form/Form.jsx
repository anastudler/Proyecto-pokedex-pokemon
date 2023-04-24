import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getAllTypes } from "../../redux/actions";

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Ingresar Nombre";
  } else if (!input.image) {
    errors.image = "Se requiere una imagen";
  } else if (!input.hp) {
    errors.hp = "Ingresar valor de Vida";
  } else if (!input.attack) {
    errors.attack = "Ingresar valor de Ataque";
  } else if (!input.defense) {
    errors.defense = "Ingresar valor de Defensa";
  } else if (!input.speed) {
    errors.speed = "Ingresar valor de Velocidad";
  } else if (!input.height) {
    errors.height = "Ingresar valor de Altura";
  } else if (!input.weight) {
    errors.weight = "Ingresar valor de Peso";
  } else if (!input.types) {
    errors.types = "Elegir Tipos";
  }
  return errors;
};

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // const handleCheck = (e) => {
  //   if (e.target.checked) {
  //     setInput({
  //       ...input,
  //       status:[...input.types, e.target.value],
  //     });
  //   }
  // };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("Pokemon Creado!");
    setInput({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  return (
    <div>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (<p className="error">{errors.name}</p>)}
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && (<p className="error">{errors.image}</p>)}
        </div>
        <div>
          <label>Vida</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
          />
          {errors.hp && (<p className="error">{errors.hp}</p>)}
        </div>
        <div>
          <label>Ataque</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
          {errors.attack && (<p className="error">{errors.attack}</p>)}
        </div>
        <div>
          <label>Defensa</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          {errors.defense && (<p className="error">{errors.defense}</p>)}
        </div>
        <div>
          <label>Velocidad</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          {errors.speed && (<p className="error">{errors.speed}</p>)}
        </div>
        <div>
          <label>Altura</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {errors.height && (<p className="error">{errors.height}</p>)}
        </div>
        <div>
          <label>Peso</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight && (<p className="error">{errors.weight}</p>)}
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            {types.map((type, index) => {
              return (
                <option key={index} value={type.name}>
                  {type.name[0].toUpperCase() + type.name.substring(1)}
                </option>
              );
            })}
          </select>
          <ul>
            <li>{input.types.map((elem) => elem + "  ")}</li>
          </ul>
          {errors.types && (<p className="error">{errors.types}</p>)}
          {/* <label htmlFor="">Tipos</label>
          {types.map((type, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`type-${index}`}
                  name={type.name}
                  value={type.name}
                  onChange={(e) => handleCheck(e)}
                />
                <label htmlFor={`type-${index}`}>
                  {type.name[0].toUpperCase() + type.name.substring(1)}
                </label>
              </div>
            );
          })} */}
        </div>
        <button type="submit">Crear Pokemon</button>
      </form>
    </div>
  );
};

export default Form;
