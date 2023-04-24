import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Filters from "../../components/Filters/Filters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, []);

  return (
    <div className={style.container}>
      <div>
        <Filters />
      </div>
      <div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
