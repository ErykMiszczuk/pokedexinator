import React, { useState, useEffect } from 'react';
import './PokemonListItem.css';

function PokemonListItem(props) {
    const [pokemonData, setPokemonData] = useState('');
    
    useEffect(() => {
        fetch(props.pokemonDetails.url)
            .then(res => res.json())
            .then(data => setPokemonData(data))
    }, [props.pokemonDetails.url])

    return (
        <li className="pokemon_list__item">
            <div className="pokemon_details">
                <div className="pokemon_name">
                    <span>{ props.pokemonDetails.name }</span>
                </div>
                <div className="pokemon_image">
                    { pokemonData ? <img className="full_image" src={pokemonData.sprites.front_default} /> : null }
                </div>
                <div className="pokemon_stats">
                    { pokemonData
                        ? pokemonData.types.map(el => (<span className="pokemon_type">{el.type.name}</span>))
                        : null
                    }
                </div>
            </div>
        </li>
    )
}

export default PokemonListItem;