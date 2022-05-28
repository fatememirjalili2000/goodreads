import React, { Component } from 'react';
import './comment.scss';
// import {spring} from 'react-spring';
import $ from 'jquery'; 
import { CenterFocusStrong } from '@mui/icons-material';
import { fontFamily } from '@mui/system';
import axios from 'axios';
import {Link} from 'react-router-dom'


class CommentBox extends React.Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
		showComments: false,
		comments: [
		//   {id: 1, authorr: "لادن", body: "تظر اول من است نظر اول من است"},
		//   {id: 2, authorr: "مریم", body: "نظر دوم من است نظر دوم من است"},
		//   {id: 3, authorr: "سپهر", body: "نظر دوم من است نطر دوم من است"}
		]
	  };
	}

	componentDidMount() {	
		console.log()
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/comments/',
		  };
	  
		  axios(config)
		  .then((response) => {
			  
			  for(let index = 0; index < response.data.length; index++)
			  {
				if( response.data[index].post === this.props.id)
				{
					let element = response.data[index];	  
					let body = response.data[index].body;
					let owner = response.data[index].owner; 
					const comment = {
						id: this.state.comments.length + 1,
						owner,
						body
						};
					
					this.setState({ comments: this.state.comments.concat([comment]) });	
				}
			  }
			
			
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	
		
	}
	
	render () {
	  const comments =this._getComments();
	 
	  let commentNodes;
	  let buttonText = <div style={{fontFamily:'Vazir',}}>'دیدن نظرات'</div>;
	  
	  if (true) {
		// buttonText = 'Hide Comments';
		commentNodes = <div className="comment-list">{comments}</div>;
	  }
	  
	  return(
		<div className="comment-box">
		  <h2 style={{color:"white",fontFamily:'Vazir',paddingLeft:'620px',fontSize:'25px',backgroundColor:'#28c5cc',height:'32px',borderRadius:'10%'}}>نظرات کاربران</h2>
		  <CommentForm id={this.props.id} addComment={this._addComment.bind(this)}/>
		  {/* <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
			{buttonText}
		  </button> */}
		  {/* <h3 className="comti">نظرات دیگران</h3> */}
		  {/* <h4 className="comment-count">
			{this._getCommentsTitle(comments.length)}
		  </h4> */}
		  {commentNodes}
		</div>  
	  );
	} // end render
	
	_addComment(authorr, body) {
	  const comment = {
		id: this.state.comments.length + 1,
		authorr,
		body
	  };
	  this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
	}
	
	_handleClick() {
	  this.setState({
		showComments: !this.state.showComments
	  });
	}
	
	_getComments() {    
		
	  return this.state.comments.map((comment) => { 
	
		return (
	  <Comment 
			authorr={comment.owner} 
			body={comment.body} 
			key={comment.id} />
		); 
		
	  });
	}
	
	_getCommentsTitle(commentCount) {
	  if (commentCount === 0) {
		return 'نظری ثبت نشده';
	  } else if (commentCount === 1) {
		return " یک نظر";
	  } else {
		return <div style={{fontFamily:'Vazir',fontSize:'23px'}}>{commentCount} نظر</div>;
		
	  }
	}
  } // end CommentBox component
  
  class CommentForm extends React.Component {
	render() {
	  return (
		<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
		  <div className="comment-form-fields">
			<input style={{fontSize:'20px',fontFamily:'Vazir',paddingLeft:'900px'}} placeholder="اسم" required ref={(input) => this._authorr = input}></input><br />
			<textarea style={{fontSize:'20px',fontFamily:'Vazir',textAlign:'right'}} placeholder="   نظر خود را بنویسید" rows="1" required ref={(textarea) => this._body = textarea}></textarea>
		  </div>
		  <div className="comment-form-actions" style={{color:'rgb(216, 209, 209)'}}>
			<button style={{direction:'rtl',fontSize:'14px',fontFamily:'Vazir'}} type="submit">ثبت نظر</button>
		  </div>
		</form>
	  );
	} // end render
	
	_handleSubmit(event) { 
	  event.preventDefault();   // prevents page from reloading on submit
	  let authorr = this._authorr;
	  let body = this._body;
	  	
		  var formData = new FormData();
          formData.append('post', this.props.id);
          formData.append('body', body.value);
      var config = {
        method: 'post',
        url: "http://localhost:8000/comments/",
        headers: { 
          'Authorization': 'Token '+ localStorage.getItem('token'), 

        },
        data : formData
      };
  
      axios(config)
      .then(function (response) {
		// authorr = response.data.author;
		// body = response.data.body;
      })
      .catch(function (error) {
        console.log(error);
      });

	  this.props.addComment(authorr.value, body.value);
	}
  } // end CommentForm component

  class Comment extends React.Component {
	render () {
	  return(
		<div className="comment">
			<br/>
			<Link 
			to={{
            pathname: `/publicprofile/${this.props.authorr}`
          }}
			>
		  <p className="cmtauth" style={{color:"#6632a1"}}>
			  {this.props.authorr}
		</p>
		</Link>
		  <p className="comment-body">- {this.props.body}</p>
		  {/* <div className="comment-footer">
			<a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a>
		  </div> */}
		</div>
	  );
	}
	// _deleteComment() {
	//   alert("-- DELETE Comment Functionality COMMING SOON...");
	// }
  }

export default CommentBox