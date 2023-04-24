import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return (
        <div className={style.mainConatiner}>
            <h1>Pokemons</h1>
            <Link className={style.button} to="/home">Home</Link>
            <Link className={style.button} to="/create">Crear</Link>
        </div>
    )
}

export default NavBar;