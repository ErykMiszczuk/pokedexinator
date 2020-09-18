import React from 'react';
import './MainMenu.css';

import MenuList from '../MenuList/MenuList.jsx';

function MainMenu(props) {
    return (
        <div className="main_menu">
            <header className="app_name"> Pokedexinator </header>
            <MenuList />
        </div>
    )
}

export default MainMenu;