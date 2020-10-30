import axios from 'axios';

//PokeApi request calls

export const fetchPokemon = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=153");
    return data;
}

export const fetchPokemonByUrl = async (url) => {
    return await axios.get(url);
}

export const fetchPokemonByName = name => axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(result => {
        const { data } = result;
        return data;
    })