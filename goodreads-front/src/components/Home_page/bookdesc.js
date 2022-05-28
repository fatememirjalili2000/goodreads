import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from "react-router"
import CommentBox from '../comment/comment';
import './bookdesc.scss';
import { fontSize, textAlign } from '@mui/system';
import './comment.scss'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



class Bookdesc extends Component {
 
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
      this.setState({data:this.props.location.state})
      // console.log(this.props.location.state.data);
      // console.log(this.props.location.state.data.title);
      // localStorage.setItem("id",this.props.location.state.data.id);
    }
    

 
 
    render() {
        return (
          // <div className="edit">
          // <p>
          //   {this.props.location.state.data.imgUrl}
          //   {this.props.location.state.data.title}
          //   {this.props.location.state.data.content}
          //   <CommentBox></CommentBox>
          // </p>
          //   </div>
<div>
    <div className="cp">
<div class="cardsdk">
  <div class="cardsdk-text">
    <div class="title-total">   
      <div class="title" style={{fontSize:"21px"}}>{this.props.location.state.data.authors}</div>
      <div class="sdkgenre">{this.props.location.state.data.genre}</div>
      
      <div class="sdkp">
       نشر   
       <h> </h>
        {this.props.location.state.data.publisher}
  
       </div>
      <div class="sdkpd">
      تاریخ نشر :
        {this.props.location.state.data.publication_date}
        
       </div>
      <div class="sdkt"><span style={{fontSize:'40px',fontFamily:'W_mahboob',fontWeight:'bold'}}>{this.props.location.state.data.title}</span></div>
      <div class="sdkd"><span style={{fontSize:'20px',fontFamily:'Vazir'}}>
        {this.props.location.state.data.Description}
        </span></div>

      <img className="sdkimg" src={this.props.location.state.data.bookAvatar}></img>
    </div>
  </div>
</div>
</div>
    

    <div className="cmtbx">
        <CommentBox id={this.props.location.state.data.pk} ></CommentBox> 
    </div>  
    <div>
    <Stack spacing={2}>
      <Pagination count={30} />
    </Stack>
    </div>
</div>
  
        
        
                )
    }
    
}

export default Bookdesc;