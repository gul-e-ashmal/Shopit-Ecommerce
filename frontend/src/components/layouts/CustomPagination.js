import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from "react-js-pagination"


const CustomPagination = ({ resperpage, filterProductCount }) => {

    const [currentPage, setCurrentPage] = useState()
    const navigate = useNavigate()

    let [searchPage] = useSearchParams()
    const page = Number(searchPage.get('page')) || 1;

    useEffect(() => {
        setCurrentPage(page);
    }, [page])


    const onChangePage = (pageNumber) => {

        setCurrentPage(pageNumber);

        if (searchPage.has('page')) {
            searchPage.set('page', pageNumber)
        } else {
            searchPage.append('page', pageNumber)
        }

        const path = window.location.pathname + '?' + searchPage.toString();
        navigate(path)

    }

    return (
        <div className=' d-flex justify-content-center'>
            {
                filterProductCount > resperpage &&
                (<Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resperpage}
                    totalItemsCount={filterProductCount}
                    // pageRangeDisplayed={5}
                    onChange={onChangePage}
                    nextPageText={'Next'}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                />)

            }
        </div>

    )
}

export default CustomPagination