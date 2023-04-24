import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing}>
      <h1>Pokemon App</h1>
      <Link to="/home">
        <button className={style.landingButton}>Ingresar</button>
      </Link>
      <p>By Ana Studler</p>
    </div>
  );
};

export default Landing;
