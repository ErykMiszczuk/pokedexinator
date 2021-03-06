import React, { useState, useCallback, useEffect } from 'react';
import './ContentPagination.css';

import ContentPaginationChangePageButton from '../ContentPaginationChangePageButton/ContentPaginationChangePageButton.jsx';

import eventEmitter from '../../functions/eventEmitter';
import { setElementScrollPos } from '../../functions/scrollPos';

function ContentPagination(props) {
    const [page, setPage] = useState(0);
    const [prevPageDisabled, setPrevPageDisabled] = useState(true);
    const [nextPageDisabled, setNextPageDisabled] = useState(false);

    useEffect(() => setPage(props.offset), [props.offset]);

    const nextPage = useCallback(() => {
        const newPage = page + 1;
        if (newPage > props.count) return; 
        setPage(newPage);
        setElementScrollPos(".app_content__area", {Y: 0, X: 0});
        eventEmitter("PAGE_CHANGED", { page: newPage });
    }, [page, props.count])
    
    const prevPage = useCallback(() => {
        const newPage = page - 1;
        if (newPage < 0) return;
        setPage(newPage);
        setElementScrollPos(".app_content__area", {Y: 0, X: 0});
        eventEmitter("PAGE_CHANGED", { page: newPage });
    }, [page])

    useEffect(() => {
        page === 0 ? setPrevPageDisabled(true) : setPrevPageDisabled(false);
        page === props.count ? setNextPageDisabled(true) : setNextPageDisabled(false);
    }, [page, props.count])

    return (
        <div className="content_pagination">
            <ContentPaginationChangePageButton 
                onClick={prevPage}
                value="P"
                disabled={prevPageDisabled} 
            />
            <span className="content_pagination__page_number">
                { page + 1 } z { Math.ceil(props.count / 24)}
            </span>
            <ContentPaginationChangePageButton 
                onClick={nextPage}
                value="N"
                disabled={nextPageDisabled}
            />
        </div>
    )
}

export default ContentPagination;