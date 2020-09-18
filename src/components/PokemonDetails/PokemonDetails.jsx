import React, { useState, useEffect, useCallback } from 'react';
import './PokemonDetails.css';

import PokemonType from '../PokemonType/PokemonType.jsx';
import PokemonDetailsDamageRelations from '../PokemonDetailsDamageRelations/PokemonDetailsDamageRelations.jsx';

import eventEmitter from '../../functions/eventEmitter';

function PokemonDetails(props) {

    const [pokemonTypesData, setPokemonTypesData] = useState('')

    useEffect(() => {
        let currentPokemonTypes = props.pokemonData.types.map(el => el.type.name)
        let currentPokemonTypesDetailsData = currentPokemonTypes.map(el => props.pokemonTypes.filter(type => type.name === el)).flat()

        setPokemonTypesData(currentPokemonTypesDetailsData);
    }, [props.pokemonData.types, props.pokemonTypes]);

    const goBack = useCallback(() => {
        eventEmitter("SHOW_POKEMON_LIST");
    }, [])


    return (
        <div className="pokemon_details">
            <div className="pokemon_details__main_header">
                <div className="pokemon_details__name"> 
                    { props.pokemonData.name } 
                </div>
                <div
                    onClick={goBack}
                    className="button"
                >
                    Back
                </div>
            </div>
            <div className="pokemon_details__gallery">
                <img
                    className="pokemon_details__image"
                    src={props.pokemonData.sprites.front_default}
                    alt={props.pokemonData.name}
                />
            </div>
            <div className="pokemon_details__stats">
                <div className="pokemon_details__header">
                    Characteristics
                </div>
                { props.pokemonData.types.map(el => (<PokemonType pokemonType={el} key={el.type.url}/>)) }
                <table className="data_table">
                    {/* <thead className="data_table__header">
                        <tr><th>Stat</th><th>Value</th></tr>
                    </thead> */}
                    <tbody>
                        { props.pokemonData.stats.map(el => (<tr className="data_table__data_row" key={el.stat.url}><td>{ el.stat.name }</td><td>{ el.base_stat }</td></tr>)) }
                    </tbody>
                </table>
            </div>
            { pokemonTypesData !== '' ? <PokemonDetailsDamageRelations damageRelations={pokemonTypesData} /> : null }
            <div className="pokemon_details__moves"> 
                <div className="pokemon_details__header">Moves</div>
                <ul className="moves_list">
                    { props.pokemonData.moves.map(el => (<li className="moves_list__item" key={el.move.url}> { el.move.name }</li>))}
                </ul>
            </div>
        </div>
    )
}

export default PokemonDetails;