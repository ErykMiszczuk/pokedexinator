import React, { useState, useCallback } from 'react';
import eventEmitter from '../../functions/eventEmitter';

function ContentPagination(props) {
    const [page, setPage] = useState(0);

    const memorizedCallback = useCallback(() => {
        setPage(page + 1);
        eventEmitter("PAGE_CHANGED", { page });
    }, [page])

    return (
        <div className="content_pagination">
            <span className="content_pagination__page_number">
                { props.count }
            </span>
            <button onClick={memorizedCallback}>CHANGE PAGE</button>
        </div>
    )
}

export default ContentPagination;