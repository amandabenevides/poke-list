import React, { createContext, useState, useContext } from 'react';

const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
    const [clicked, setClicked] = useState(0);
    const [search, setSearch] = useState('');

    return (
        <PokemonContext.Provider
            value={{ clicked, setClicked }}>
            {children}
        </PokemonContext.Provider>
    );
}

export function usePokemon() {
    const context = useContext(PokemonContext);
    const { clicked, setClicked, search, setSearch } = context;
    return { clicked, setClicked, search, setSearch };
}