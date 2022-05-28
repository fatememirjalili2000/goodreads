import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Row, Col, Container } from 'reactstrap';



function Searchinrespage({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  let history = useHistory();
  const enterpressed = (event) => {
    if (event.key === 'Enter') {
      console.log("enter pressed");
     
            history.push({
              pathname: "/search",
              state: { data: filteredData },
          });

    }
  }
  const handleFilter = (event) => {
    
  
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    var config1 = {
      method: 'Get',
    url: 'http://127.0.0.1:8000/search/?q=' + wordEntered,
      // headers: { 
      //   'Authorization': 'Token '+ localStorage.getItem('token'), 
      // }
    };

    axios(config1)
    .then((response) => {
      
      if( JSON.stringify(response.data) )
      {
        setFilteredData( response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    const newFilter = filteredData;
    console.log(newFilter);
    // const newFilter = data.filter((value) => {
    //   // return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

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
    <div>
     <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={'... جستجوی کتاب'}
          value={wordEntered}
          onChange={handleFilter}
          onKeyPress={enterpressed}
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
    </div>
  );
}

export default Searchinrespage;