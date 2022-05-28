import React from 'react';
import axios from 'axios';
import './styles.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ErrorMsg.css';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import '../fonts/Vazir.ttf';
import { Route } from "react-router-dom";
import { CenterFocusStrong, Home, Router } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";





class login extends React.Component {
    constructor() {
      super();// to call the state
      this.state = { //behaviour of components and how to render
        fields: {},
        errors: {},
        logerror:'',
        history:'',
      }
      


      this.handleChange = this.handleChange.bind(this);
      this.submituserlogin = this.submituserlogin.bind(this);

    };

    
    

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserlogin(e) {
      e.preventDefault();
      if (true) {
          let fields = {};
          fields["username"] = "";
          fields["email"] = "";
          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

      componentDidMount() {
        console.log(this.props.history);
      }

    handleSubmit = (e) => {
      let loggedin = false;
      e.preventDefault();
          var formData = new FormData();
          formData.append('username', this.state.fields["username"]);
          formData.append('email', this.state.fields["email"]);
          formData.append('password',this.state.fields["password"]);
          axios
          .post("http://localhost:8000/api/account/login/",formData)
          .then((response) => {
            localStorage.setItem('token',response.data.token);
            loggedin = true;
            console.log('axios response')
            if(loggedin)
            {
             
              this.props.history.push('/');
              window.location.reload(); 
            }
          }
            )
          .catch((err) => {
            console.log(err);
            let error = <h5 className="warningtexti">اطلاعات درست نیست !</h5>;
            this.setState({logerror:error})
          });
       
          
  };

   

  render() {
    
    return (
      <div class="signin">
        <Form>
          <BsFillArrowRightCircleFill className="iconi" color="#28c5cc"/>
          <br/>
          <h2 className="icontexti">ورود</h2>
          <img src="https://s4.uupload.ir/files/newwwww_66m.jpg" className="imgi"></img>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ایمیل</Form.Label> */}
            <Form.Control name='username' size="sm" type="username" placeholder="نام کاربری*" style={{height: '47px',fontSize:'22px'  }} size="lg" value={this.state["username"]} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>ایمیل</Form.Label> */}
            <Form.Control name='email' size="sm" type="email" placeholder="ایمیل*" style={{height: '47px',fontSize:'22px'  }} size="lg" value={this.state["email"]} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control name='password' size="sm" type="password" placeholder="رمز عبور*" style={{height: '47px',fontSize:'22px' }} size="lg"value={this.state["password"]} onChange={this.handleChange}/>
          </Form.Group>
          <div ><h5>{this.state.logerror}</h5></div> 
          {/* <Link to='/'> */}
            <Button variant="primary" size="lg" className="signinbutton" onClick={this.handleSubmit} style={{fontSize:'23px',textAlign:'center' }} >
              ورود     
            </Button>
            {/* </Link> */}
          
          <br/><br/>
          <h4 className="linktexti" style={{fontSize:'23px'}}>
              حساب نداری؟ <Link style={{color:'#28c5cc' ,}} to="/register2"  >یه دونه بساز </Link>
          </h4>
        </Form>
      </div>
      );
  }
}


export default login;