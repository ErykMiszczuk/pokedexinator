import React from 'react';
import './ContentPaginationChangePageButton.css';

function ContentPaginationChangePageButton(props) {
    return (
        <input 
            type="button" 
            className="content_pagination__change_page_button" 
            value={props.value}
            onClick={props.onClick}
        />
    )
}

export default ContentPaginationChangePageButton;