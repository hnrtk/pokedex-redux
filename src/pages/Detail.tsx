/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import BarChart from "../components/BarChart";
import { POKEAPI_TYPE_TO_COLOR } from "../utils/pokemonColorByType";
import { fetchPokemonByName } from "../redux/pokemonSlice";
import { RootState } from "../redux/store";

const Detail = () => {
  const { pathname } = useLocation();
  const { pokemon } = useSelector((state: RootState) => state.pokemon);

  const dispatch = useDispatch();

  // Efeito para recuperar dados quando a página é recarregada.
  useEffect(() => {
    if (!pokemon.name) {
      const pokemonName = pathname.split("/")[2];
      dispatch(fetchPokemonByName(pokemonName));
    }
  }, [pokemon]);

  return (
    <div className="px-2 md:px-16 lg:px-72 xl:px-96 min-h-screen bg-gray-100">
      <div className="flex justify-center space-x-2 mb-10 py-8">
        <h1 className="font-bold text-4xl capitalize">{pokemon.name}</h1>
        <p className="text-4xl text-gray-500">#{pokemon.id}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
        <div
          className="flex justify-center bg-gray-50 rounded-2xl"
          style={{
            width: "420px",
          }}
        >
          <img src={pokemon.sprite} alt={pokemon.name} width="100%" />
        </div>
        <div>
          <p className="text-lg mb-12">{pokemon.flavorText}</p>
          <div
            style={{ backgroundColor: "#30a7d7" }}
            className="grid grid-cols-2 w-full rounded-2xl p-6 mb-10"
          >
            <div>
              <p className="white-p">Height</p>
              <p className="black-p">{pokemon.height} (dm)</p>
              <p className="white-p">Weight</p>
              <p className="black-p">{pokemon.weight} (hg)</p>
            </div>
            <div>
              <p className="white-p">Abilities</p>
              {pokemon?.moves?.map((move: string) => (
                <p key={move} className="capitalize black-p">
                  {move.replace("-", " ")}
                </p>
              ))}
            </div>
          </div>
          <p className="text-xl mb-6">Type</p>
          <div className="flex space-x-4">
            {pokemon?.types?.map((type: string) => (
              <span
                key={type}
                className={`type-pill-detail bg-${POKEAPI_TYPE_TO_COLOR[type]}`}
              >
                {type}
              </span>
            ))}
          </div>
          <p className="text-xl mb-6">Weakness</p>
          {/* <div className="flex space-x-4">
            {pokemon?.weakness?.map((type: string) => (
              <span
                key={type}
                className={`type-pill-detail bg-${POKEAPI_TYPE_TO_COLOR[type]}`}
              >
                {type}
              </span>
            ))}
          </div> */}
        </div>
      </div>
      <div className="block bg-gray-50 rounded-2xl p-4">
        <p className="text-xl mb-6">Stats</p>
        <BarChart data={pokemon.stats} />
      </div>
    </div>
  );
};

export default Detail;
