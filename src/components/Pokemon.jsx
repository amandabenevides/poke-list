import React, { useState, useCallback } from 'react';
import { usePokemon } from "../context/PokemonContext";
import '../components/Pokemon.css';
import PokemonModal from "../components/PokemonModal";

export default ({ id, name, sprite, type, onClick, pokemonProfile }) => {
  const { clicked, setClicked } = usePokemon();

  function handleClick(id) {
    onClick(pokemonProfile);
  }
  return (
    <>
      <div className="pokemon-item">
        <div class="container">
          <div class="card-poke">
            <div>
              <div class="name">#{id} {name}</div>
              <div class="type">
                <span>{type}</span>
              </div>
              <div class="img"><img src={sprite}></img></div>
            </div>
            <div class="foot-card">
              <button onClick={() => handleClick(id)} >+ info</button>
            </div>
          </div>
        </div></div>
    </>
  )
}

