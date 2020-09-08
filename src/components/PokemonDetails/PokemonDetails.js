import React from 'react';
import './PokemonDetails.css';

function PokemonDetails(props) {
    return (
        <div className="pokemon_details">
            <div className="pokemon_details__name"> { props.pokemonData.name } </div>
            <div className="pokemon_details__stats">
                <ul className="pokemon_details__stats_list">
                    { props.pokemonData.stats.map(el => (<li> {el.stat.name} {el.base_stat} </li>))}
                </ul>
            </div>
        </div>
    )
}

export default PokemonDetails;