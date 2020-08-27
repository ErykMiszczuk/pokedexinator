import React from 'react';
import './MenuListItem.css';

function MenuListItem(props) {
    return (
        <li className="menu_list__item">{props.children}</li>
    )
}

export default MenuListItem;