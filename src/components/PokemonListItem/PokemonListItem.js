import React, { useState, useEffect, useCallback } from 'react';
import './PokemonListItem.css';
import PokemonType from '../PokemonType/PokemonType';
import eventEmitter from '../../functions/eventEmitter';

function PokemonListItem(props) {
    const [pokemonData, setPokemonData] = useState('');
    
    useEffect(() => {
        fetch(props.pokemonDetails.url)
            .then(res => res.json())
            .then(data => setPokemonData(data))
    }, [props.pokemonDetails.url])

    const showPokemonDetails = useCallback(() => {
        eventEmitter('SHOW_POKEMON_DETAILS', pokemonData);
    }, [pokemonData])

    return (
        <li className="pokemon_list__item"
            onClick={showPokemonDetails}
        >
            <div className="pokemon_description">
                <div className="pokemon_name">
                    <span>{ props.pokemonDetails.name }</span>
                </div>
                <div className="pokemon_image">
                    { pokemonData 
                        ? <img 
                            className="full_image" 
                            src={pokemonData.sprites.front_default} 
                            alt={props.pokemonDetails.name} 
                          /> 
                        : null }
                </div>
                <div className="pokemon_stats">
                    { pokemonData
                        ? pokemonData.types.map(el => (<PokemonType pokemonType={el} key={el.type.url}/>))
                        : null
                    }
                </div>
            </div>
        </li>
    )
}

export default PokemonListItem;