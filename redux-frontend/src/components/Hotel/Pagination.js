import { React, useMemo } from 'react';

const Pagination = ({ itemsPerPage, listItem ,setPageNum}) => {

    const pageNumber = useMemo(() => {
        const totalPages = Math.ceil(listItem / itemsPerPage);
        const pageNumbers = [];
        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(i + 1);
        }
        return pageNumbers;
    }, [itemsPerPage, listItem]);
    

    return (
        <div className="pagination">
            {pageNumber?.map((number) =>
                <a key={number} onClick={e => setPageNum(number)} >
                    {number}
                </a>
            )}
            <div className="clear"></div>
        </div>
    );
};

export default Pagination;