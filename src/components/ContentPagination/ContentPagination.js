import React, { useState, useCallback } from 'react';
import './ContentPagination.css';
import eventEmitter from '../../functions/eventEmitter';
import ContentPaginationChangePageButton from '../ContentPaginationChangePageButton/ContentPaginationChangePageButton';

function ContentPagination(props) {
    const [page, setPage] = useState(0);

    const nextPage = useCallback(() => {
        const newPage = page + 1;
        setPage(newPage);
        eventEmitter("PAGE_CHANGED", { page: newPage });
    }, [page])

    const prevPage = useCallback(() => {
        const newPage = page - 1;
        setPage(newPage);
        eventEmitter("PAGE_CHANGED", { page: newPage });
    }, [page])

    return (
        <div className="content_pagination">
            <ContentPaginationChangePageButton 
                onClick={prevPage}
                value="P" 
            />
            <span className="content_pagination__page_number">
                { page + 1 } z { Math.ceil(props.count / 24)}
            </span>
            <ContentPaginationChangePageButton 
                onClick={nextPage}
                value="N"
            />
        </div>
    )
}

export default ContentPagination;