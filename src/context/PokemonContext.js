import React, { createContext, useState, useContext } from 'react';

const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
    const [clicked, setClicked] = useState(0);

    return (
        <PokemonContext.Provider
            value={{ clicked, setClicked }}>
            {children}
        </PokemonContext.Provider>
    );
}

export function usePokemon() {
    const context = useContext(PokemonContext);
    const { clicked, setClicked } = context;
    return { clicked, setClicked };
}