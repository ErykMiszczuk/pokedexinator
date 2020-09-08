import React, { useState, useEffect } from 'react';
import './PokemonDetails.css';
import PokemonType from '../PokemonType/PokemonType';

function PokemonDetails(props) {

    const [pokemonTypesData, setPokemonTypesData] = useState({})

    useEffect(() => {
        let pokemonTypes = props.pokemonData.types.map(el => el.type.name)
        let typesData = pokemonTypes.map(el => props.pokemonTypes.filter(type => type.name === el)).flat()

        setPokemonTypesData(typesData);
    }, [props.pokemonData.types, props.pokemonTypes])


    return (
        <div className="pokemon_details">
            <div className="pokemon_details__name"> 
                { props.pokemonData.name } 
            </div>
            <div className="pokemon_details__stats">
                <table>
                    <thead>
                        <tr><th>Stat</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                        { props.pokemonData.stats.map(el => (<tr key={el.stat.url}><td>{ el.stat.name }</td><td>{ el.base_stat }</td></tr>)) }
                    </tbody>
                </table>
            </div>
            <div className="pokemon_details__gallery">
                <img
                    className="pokemon_details__image"
                    src={props.pokemonData.sprites.front_default}
                    alt={props.pokemonData.name}
                />
            </div>
            <div className="pokemon_details__types">
                <div>Type</div>
                { props.pokemonData.types.map(el => (<PokemonType pokemonType={el} key={el.type.url}/>)) }
            </div>
            <div className="pokemon_details__damage_relations">

            </div>
            <div className="pokemon_details__moves"> 
                <div>Moves</div>
                <ul className="pokemon_details__moves_list">
                    { props.pokemonData.moves.map(el => (<li key={el.move.url}> { el.move.name }</li>))}
                </ul>
            </div>
        </div>
    )
}

export default PokemonDetails;