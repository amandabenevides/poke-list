import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Pokemon from "../components/Pokemon";
import {
  fetchPokemon,
  fetchPokemonByUrl,
  fetchPokemonByName,
} from "../api/requests";
import PokemonModal from "../components/PokemonModal";
import { usePokemon } from "../context/PokemonContext";
import { Container, Row, Col } from 'reactstrap';

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const { clicked, setClicked } = usePokemon();
  const { search, setSearch } = usePokemon();

//   let filteredPokemons= pokemonList.filter(item => {
    
//    item.name.includes(search.toLowerCase())
// })

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
    setLoading(true);
    const {
      data: { next, previous, results },
    } = await fetchPokemonByUrl(prevUrl);
    setNextUrl(next);
    setPrevUrl(previous);
    setLoading(false);
    setPokemonList(await Promise.all(
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
  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setClicked(true);
  }
  return (
    <>
      <PokemonModal selectedPokemon={selectedPokemon} />
      <div className="button-wrap">
      <button className="top-button" onClick={prev}>Prev</button>
      <button className="top-button" onClick={next}>Next</button>
      </div>
      <Container>
        <Row xs="auto">
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => (
            
              <Pokemon
                pokemonProfile={pokemon}
                onClick={handleClick}
                id={pokemon.id}
                name={pokemon.name}
                sprite={pokemon.sprites.front_default}
                type={pokemon.types[0].type.name}
              />))

              )
            : (
              <p>Loading...</p>
            )}
        </Row>
      </Container>
    </>
  );
}

export default Main;
