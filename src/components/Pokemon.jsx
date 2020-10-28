import React from 'react';
import { usePokemon } from "../context/PokemonContext";

export default ({ id, name, sprite }) => {
  const { clicked, setClicked } = usePokemon();

  function handleClick(id) {
    console.log('clicou', id);
    setClicked(true)
    console.log(clicked);
  }
  return (
    <div className="pokemon-item" onClick={() => handleClick(id)}>
      <p><img src={sprite}></img></p>
      <p>#{id}</p>
      <p>{name}</p>
    </div>
  )
}