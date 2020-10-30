import React, { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon/Pokemon";
import {
  fetchPokemon,
  fetchPokemonByUrl,
  fetchPokemonByName,
} from "../api/requests";
import PokemonModal from "../components/PokemonModal/PokemonModal";
import { usePokemon } from "../context/PokemonContext";
import { Container, Row } from 'reactstrap';
import { Spinner } from 'reactstrap';

function Main() {

  const [pokemonList, setPokemonList] = useState([]); //State to set the Pokemon list after the API call
  const [selectedPokemon, setSelectedPokemon] = useState({}); // Sets the selected Pokemon once the +info button is clicked
  const [nextUrl, setNextUrl] = useState(""); // Sets the next url for the current list
  const [prevUrl, setPrevUrl] = useState(""); // Sets the previous url for the current list
  const { setClicked } = usePokemon(); // Context to share the clicked property to trigger the modal render
  const { search } = usePokemon(); // Context to share the input from the navbar search bar
  const [filteredPokemons, setFilteredPokemons] = useState([]); // State to set the filtered Pokemons, according to the search bar input

  // Api calls to set current, previous and next pages.

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

  // Returns a new filtered Pokemon list according to the user input on the searchbar
  useEffect(() => {
    setFilteredPokemons(
      pokemonList.filter(pokemon => {
        return pokemon.name.includes(search.toLowerCase())
      })
    )
  }, [search, pokemonList]);

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
