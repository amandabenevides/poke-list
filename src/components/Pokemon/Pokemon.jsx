import React from 'react';
import '../Pokemon/Pokemon.css';

// Pokémon card

export default ({ id, name, sprite, type, onClick, pokemonProfile }) => {

  // Passing id when the Pokémon's info button is clicked 

  function handleClick(id) {
    onClick(pokemonProfile);
  }
  return (
    <>
      <div className="pokemon-item">
        <div className="container">
          <div className="card-poke">
            <div>
              <div className="name">#{id} {name}</div>
              <div className="type">
                <span>{type}</span>
              </div>
              <div className="img"><img src={sprite} alt="Pokémon Sprite"></img></div>
            </div>
            <div className="foot-card">
              <button onClick={() => handleClick(id)} >+ info</button>
            </div>
          </div>
        </div></div>
    </>
  )
}

