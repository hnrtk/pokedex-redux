/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNextPokemons,
  fetchPokemons,
  setPokemon,
} from "../redux/pokemonSlice";
import { useHistory } from "react-router";
import { Pokemon } from "../types";
import { AppDispatch, RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nextUrl, pokemons } = useSelector(
    (state: RootState) => state.pokemon
  );
  const { push } = useHistory();

  useEffect(() => {
    if (nextUrl) return;
    dispatch(fetchPokemons());
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4">
      <div className="flex justify-center py-8">
        <SearchBar />
      </div>
      <div className="pokemon-grid-list">
        {pokemons &&
          pokemons?.map((poke: Pokemon) => (
            <div
              key={poke.id}
              className="flex justify-center"
              onClick={() => {
                dispatch(setPokemon(poke));
                push(`/pokemon/${poke.name}`);
              }}
            >
              <Card
                name={poke.name}
                sprite={poke.sprites.front_default}
                types={poke.types.map((t: any) => t.type.name)}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center mb-10">
        <button
          className="load-more-pokemons"
          onClick={() => dispatch(fetchNextPokemons())}
        >
          LOAD MORE POKEMONS
        </button>
      </div>
    </div>
  );
};

export default Home;
