import React, { useEffect, useState, useReducer } from 'react';
import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import ContentPagination from '../ContentPagination/ContentPagination';
import useEventListener from '../../hooks/useEventListener';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

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

    useEventListener('PAGE_CHANGED', (e) => {
        setOffset(e.detail.page)
    });

    useEventListener('SHOW_POKEMON_DETAILS', (e) => {
        setPokemonDetails(e.detail);
        setIsPokemonDetailShowed(true);
    })

    useEventListener('HIDE_POKEMON_DETAILS', () => {
        setPokemonDetails({});
        setIsPokemonDetailShowed(false);
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
                <ContentPagination count={pokemonList.count}/>
              </>
    )
}

export default PokemonList;