import React from 'react';
import './MenuList.css';

import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
    return (
        <ul className="menu_list">
            <MenuListItem> Pokemons List </MenuListItem>
        </ul>
    )
}

export default MenuList;