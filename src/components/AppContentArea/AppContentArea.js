import React from 'react';
import './AppContentArea.css';
import PokemonList from '../PokemonList/PokemonList';

function AppContentArea(props) {
    return (
        <div className="shadow_wrapper">
            <main className="app_content__area">
                <PokemonList />
            </main>
        </div>
    )
}

export default AppContentArea;