import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pokemon from "../components/pokemon.component";
import {
  fetchPokemon,
  fetchPokemonByUrl,
  fetchPokemonByName,
} from "../api/requests";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");



  useEffect(() => {
    async function fetchInitialData() {
      const { next, previous, results } = await fetchPokemon();
      setNextUrl(next);
      setPrevUrl(previous);
      setPokemonList( await Promise.all(
        results.map((pokemon) => {
          return fetchPokemonByName(pokemon.name);
        })
      ))
    }
    fetchInitialData();
  }, []);

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const {
      data: { next, previous, results },
    } = await fetchPokemonByUrl(prevUrl);
    setNextUrl(next);
    setPrevUrl(previous);
    setLoading(false);
    setPokemonList( await Promise.all(
      results.map((pokemon) => {
        return fetchPokemonByName(pokemon.name);
      })
    ))
  };

  const next = async () => {
    setLoading(true);
    const {
      data: { previous, next, results },
    } = await fetchPokemonByUrl(nextUrl);
    setNextUrl(next);
    setPrevUrl(previous);
    setLoading(false);
    setPokemonList(await Promise.all(
      results.map((pokemon) => {
        return fetchPokemonByName(pokemon.name);
      })
    ))
  };
  return (
    <>
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => (
          <Pokemon
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.sprites.front_default}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </>
  );
}

export default Main;
