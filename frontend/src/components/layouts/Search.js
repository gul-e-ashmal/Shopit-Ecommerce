import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/?keyword=${keyword}`)

        } else {
            navigate("/")
        }

    }
    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        {/* <i className="fa fa-search" aria-hidden="true"></i> */}
                        <IoSearchSharp size={20} />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search