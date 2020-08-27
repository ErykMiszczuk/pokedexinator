import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

function PokemonList(props) {

    const [pokemonList, setPokemonList] = useState({});

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(res => res.json())
            .then(data => setPokemonList(data));
    }, [])

    return (
        <ul className="pokemon_list">
            {
                pokemonList.results ? pokemonList.results.map(el => <PokemonListItem pokemonDetails={el} key={el.url}/>) : null
            }
        </ul>
        
    )
}

export default PokemonList;