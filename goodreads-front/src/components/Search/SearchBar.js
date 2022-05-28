import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={'... جستجوی کتاب'}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {/* {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })} */}
          {filteredData.slice(0, 15).map((value, key) => {
            
            return (
            
                <Link style={{color:'black'}} to={{
                pathname: '/bookdesc',
                state: {data : value},
              }}>
                <p style={{borderBottom:' 1px dotted',borderColor:'#88858469'}}>کتاب {value.title} &nbsp;<span style={{fontFamily:'Vazir',fontSize:'14px'}}>{value.authors}</span> </p>
                </Link>
              
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;