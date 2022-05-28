import React, { useState } from "react";
import axios from 'axios';
import Heart from "react-animated-heart";

 
const Myheart = (props) => {
  console.log("heart",JSON.parse(props.myitem.pk));
    const [isClick, setClick] = useState(JSON.parse(props.myitem.favourite));
    //JSON.parse(props.myitem.addedfavorites)
    const handleheart = (isClick) => { 
      // console.log(JSON.parse(props.myitem.addedfavorites))
      // if(!isClick)
      // {
        var formData = new FormData();
        formData.append("book",JSON.parse(props.myitem.pk));
        console.log("fd = >",formData);
        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/favourite/create/',
          headers: { 
            'Authorization': 'token '+ localStorage.getItem('token'), 
          },
          data : formData
        };
    
        axios(config)
        .then((response) => {
          // console.log("response isssssssssss",JSON.stringify(response.data));
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // }
      // else
      // {
      //   console.log("remove favor")
      // }
  };
  
    return (
      <div>
        <Heart isClick={isClick} onClick={() => [setClick(!isClick), handleheart(isClick)]} />
        </div>
    );
  }
  export default Myheart;