import React from 'react';
import './PokemonType.css';

function PokemonType(props) {
    return (
        <span 
            className={"pokemon_type pokemon_type--" + props.pokemonType.type.name} 
            key={props.pokemonType.type.url}
        >
            {props.pokemonType.type.name}
        </span>
    )
}

export default PokemonType;