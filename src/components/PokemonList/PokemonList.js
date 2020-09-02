import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import ContentPagination from '../ContentPagination/ContentPagination';
import useEventListener from '../../hooks/useEventListener';

function PokemonList(props) {

    const [pokemonList, setPokemonList] = useState({});
    const [offset, setOffset] = useState(0);

    useEventListener('PAGE_CHANGED', (e) => {
        setOffset(e.detail.page)
    });

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=24&offset=${offset * 24}`)
            .then(res => res.json())
            .then(data => setPokemonList(data));
    }, [offset])

    return (
        <>
            <ul className="pokemon_list">
                {
                    pokemonList.results ? pokemonList.results.map(el => <PokemonListItem pokemonDetails={el} key={el.url}/>) : null
                }
            </ul>
            <ContentPagination />
        </>
    )
}

export default PokemonList;