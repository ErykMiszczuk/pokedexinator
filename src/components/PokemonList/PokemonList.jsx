import React, { useEffect, useState, useReducer } from 'react';
import './PokemonList.css';

import PokemonListItem from '../PokemonListItem/PokemonListItem.jsx';
import ContentPagination from '../ContentPagination/ContentPagination.jsx';
import PokemonDetails from '../PokemonDetails/PokemonDetails.jsx';

import useEventListener from '../../hooks/useEventListener';
import { getElementScrollPos, setElementScrollPos } from '../../functions/scrollPos';

const initialState = []

function reducer(state, action) {
    switch (action.type) {
        case 'merge':
            return [...state, action.data];
        default:
            return state;
    }
}

function PokemonList(props) {

    const [pokemonList, setPokemonList] = useState({});
    const [offset, setOffset] = useState(0);
    const [pokemonTypesList, setPokemonTypesList] = useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isPokemonDetailShowed, setIsPokemonDetailShowed] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [scrollPosition, setScrollPostion] = useState('');

    useEventListener('PAGE_CHANGED', (e) => {
        setOffset(e.detail.page);
    });

    useEventListener('SHOW_POKEMON_DETAILS', (e) => {
        setScrollPostion(getElementScrollPos(".app_content__area"));
        setPokemonDetails(e.detail);
        setIsPokemonDetailShowed(true);
        window.requestAnimationFrame(() => {
            setElementScrollPos(".app_content__area", {Y: 0, X: 0});
        })
    });
    
    useEventListener('SHOW_POKEMON_LIST', (e) => {
        setIsPokemonDetailShowed(false);
        setPokemonDetails({});
        window.requestAnimationFrame(() => {
            setElementScrollPos(".app_content__area", scrollPosition);
        })
    })

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=24&offset=${offset * 24}`)
            .then(res => res.json())
            .then(data => setPokemonList(data));
    }, [offset])

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/`)
            .then(res => res.json())
            .then(data => setPokemonTypesList(data))
    }, [])

    useEffect(() => {
        if (pokemonTypesList.results) {
            pokemonTypesList.results.forEach(el => {
                fetch(el.url)
                    .then(res => res.json())
                    .then(data => dispatch({type: 'merge', data}))
            })
        }
    }, [pokemonTypesList])

    return (
        isPokemonDetailShowed 
            ? <PokemonDetails 
                pokemonData={pokemonDetails} 
                pokemonTypes={state}
              />
            : <>
                <ul className="pokemon_list">
                    {
                        pokemonList.results ? pokemonList.results.map(el => <PokemonListItem pokemonDetails={el} key={el.url}/>) : null
                    }
                </ul>
                <ContentPagination count={pokemonList.count} offset={offset}/>
              </>
    )
}

export default PokemonList;