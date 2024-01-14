import React,{useState} from "react";
import {FaSearch} from "react-icons/fa";
import './searchBar.css';

const SearchBar=()=>{
    return(
        <div className="ToolBar">
            <div className="Bar">
                <FaSearch className="SearchIcon"></FaSearch>
                <input className="InputBar"placeholder="Type to Search"/>
            </div>
            
            
           
        </div>
    )
}
export default SearchBar;