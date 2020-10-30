import React, { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon";
import {
  fetchPokemon,
  fetchPokemonByUrl,
  fetchPokemonByName,
} from "../api/requests";
import PokemonModal from "../components/PokemonModal";
import { usePokemon } from "../context/PokemonContext";
import { Container, Row } from 'reactstrap';
import { Spinner } from 'reactstrap';

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const { setClicked } = usePokemon();
  const { search, setSearch } = usePokemon();
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    async function fetchInitialData() {
      const { next, previous, results } = await fetchPokemon();
      setNextUrl(next);
      setPrevUrl(previous);
      setPokemonList(await Promise.all(
        results.map((pokemon) => {
          return fetchPokemonByName(pokemon.name);
        })
      ))
    }
    fetchInitialData();
  }, []);

  const prev = async () => {
    if (!prevUrl) return;
    const {
      data: { next, previous, results },
    } = await fetchPokemonByUrl(prevUrl);
    setNextUrl(next);
    setPrevUrl(previous);
    setPokemonList(await Promise.all(
      results.map((pokemon) => {
        return fetchPokemonByName(pokemon.name);
      })
    ))
  };

  const next = async () => {
    const {
      data: { previous, next, results },
    } = await fetchPokemonByUrl(nextUrl);
    setNextUrl(next);
    setPrevUrl(previous);
    setPokemonList(await Promise.all(
      results.map((pokemon) => {
        return fetchPokemonByName(pokemon.name);
      })
    ))
  };
  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setClicked(true);
  }

  useEffect(() => {
    setFilteredPokemons(
      pokemonList.filter(pokemon => {
        return pokemon.name.includes(search.toLowerCase())
      })
    )
  }, [search, pokemonList]);

  console.log('busca',search);
  
  return (
    <>
      <PokemonModal selectedPokemon={selectedPokemon} />
      <div className="button-wrap">{search}
        <button className="top-button" onClick={prev}>Prev</button>
        <button className="top-button" onClick={next}>Next</button>
      </div>
      <Container>
        <Row xs="auto">
          {pokemonList.length > 0 ? (
            // pokemonList.map((pokemon) => (
            filteredPokemons.map((pokemon) => (
              <Pokemon key={pokemon.id}
                pokemonProfile={pokemon}
                onClick={handleClick}
                id={pokemon.id}
                name={pokemon.name}
                sprite={pokemon.sprites.front_default}
                type={pokemon.types[0].type.name}
              />))
          )
            : (<div className="loader">
              <span>Loading </span> <Spinner color="info" />
            </div>
            )}
        </Row>
      </Container>
    </>
  );
}

export default Main;
