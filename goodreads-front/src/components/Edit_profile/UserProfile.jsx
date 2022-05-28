import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
// import DefaultUserPic from "../Images/team-male.jpg";
import DefaultUserPic from "../Images/a2.jpg"
import './styles.scss'
import '../fonts/Vazir.ttf';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {Container, Row,Col } from 'react-bootstrap';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import '../fonts/Vazir.ttf';


const axios = require('axios');




class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            profileImage:'',
            bio:'',
            uploadedFile:null
        }
    }

    fetchUserDetails = () =>{

      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/account/properties/',
        headers: { 
          'Authorization': 'Token '+ localStorage.getItem('token'), 

        }
      };
  
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({firstname:JSON.stringify(response.data.firstname)});
        this.setState({lastname:JSON.stringify(response.data.lastname)});
        this.setState({username:JSON.stringify(response.data.username)});
        if(! JSON.stringify(response.data.image) )
        {
            this.setState({profileImage:JSON.stringify(response.data.image)});
        }
        this.setState({bio:JSON.stringify(response.data.bio)});
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        var formData = new FormData();  
      formData.append('firstname', this.state.firstname);
      formData.append('lastname', this.state.lastname);
      formData.append('username',this.state.username);
      formData.append('bio',this.state.bio);
      formData.append('image',this.state.uploadedFile);

      var config = {
        method: 'put',
        url: 'http://127.0.0.1:8000/api/account/properties/update/',
        headers: { 
          'Authorization': 'Token '+ localStorage.getItem('token'), 

        },
        data : formData
      };
  
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        this.setState({profileImage:JSON.stringify(response.data.image)})
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    componentDidMount(){
     this.fetchUserDetails();
     console.log(this.state.firstname);
    }
    
render(){
  
    let c = "error";
    // if(this.state.profileImage){
    //     var imagestr=this.state.profileImage;
    //     imagestr = imagestr.replace("public/", "");
        var profilePic="http://127.0.0.1:8000/media/account/q4.jpeg";
    // }
    // else{
    //      profilePic=DefaultUserPic;
    // }

    return (
        
        <div className="editbox">
        <div class="edit">
          
        <br/><br/>  
        <Form onSubmit={this.submitUserRegister} >
       
        <br/><br/>       
          {/* <img src="https://s4.uupload.ir/files/a2_qbip.jpg" className="img-e"></img> */}
        
               <Col>
               <img src={profilePic} className="img-e" alt="profils pic" />
               </Col>
        
        <br/><br/>
        
        <br/><br/>
        <Box
      sx={{
        width: 500,
        height:500,
        maxWidth: '100%',
      }}
       >
         <Col>
         <Row>
      <TextField
      // className={isError.lastname.length > 0 ? "is-invalid form-control" : "form-control"}
      fullWidth 
      // color= {c}
      value={this.state.firstname} 
      onChange={(e) => this.setState({firstname:e.target.value})}
      label={<h10 class="labeltexte">نام</h10>}
      id="fullWidth" 
      />
      </Row>
      <Row>
      <TextField 
      fullWidth 
      color= {c}
      value={this.state.lastname} 
      onChange={(e) => this.setState({lastname:e.target.value})}
      label={<h10 class="labeltexte"> نام خوانوادگی</h10>}
      id="fullWidth" 
      />
      </Row>
      <Row>
      <TextField 
      fullWidth 
      color= {c}
      value={this.state.username} 
      onChange={(e) => this.setState({username:e.target.value})}
      label={<h10 class="labeltexte">نام کاربری</h10>}
      id="fullWidth" 
      />
      </Row>
      <Row>
      <TextField
          id="outlined-multiline-static"
          label={<h10 class="labeltexte">درباره</h10>}
          multiline
          rows={4}
          defaultValue={this.state.bio}
          onChange={(e) => this.setState({bio:e.target.value})}
        />
        </Row>
        <Row>
      <TextField
        id="date"
        label={<h10 class="labeltexte">
            تاریخ تولد
           </h10>}
        type="date"
        defaultValue="2017-05-24"
        className="textField"
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Row>
      
      <Form.Group controlId="formCategory4">
              <Form.Label>
          <h6 class="labeltexte">
            عکس پروفایل
           </h6>
            </Form.Label>
             <Form.Control type="file" accept="image/png , image/jpg , image/jpeg, image/gif, image/jpeg" name="profileImage"
            onChange={this.changeProfileImage}/>
            </Form.Group>
  
<Row>
                <Link style={{color:'#6632a1' ,}} to="/"  >
                   <Button variant="primary" size="lg" className="buttone" onClick={this.UpdateProfileHandler} >
                       ثبت
                   </Button>
                       </Link>
                       </Row>
                       </Col>            
    </Box>
        {/* <Form.Group controlId="formCategory2">
          <Form.Label>
            <h6 class="labeltexte">
            نام
           </h6>
            </Form.Label>
          <Form.Control class="user-input-container" type="firstname" defaultValue={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value})}/>
        </Form.Group>

        <Form.Group controlId="formCategory3">
          <Form.Label>
          <h6 class="labeltexte">
            نام خوانوادگی
           </h6>
            </Form.Label>
          
          <Form.Control class="user-input-container" type="lastname" defaultValue={this.state.lastname}
           onChange={(e) => this.setState({lastname:e.target.value})}/>  
      </Form.Group>

        <Form.Group controlId="formCategory3">
          <Form.Label>
          <h6 class="labeltexte">
             نام کابری
           </h6>
            </Form.Label>

          <Form.Control class="user-input-container" type="username" defaultValue={this.state.username} onChange={(e) => this.setState({username:e.target.value})}/>
        
        </Form.Group>        
              <Form.Group controlId="formCategory4">
                <Form.Label>
                <h6 class="labeltexte">
            درباره
           </h6>
            </Form.Label>
                <Form.Control type="bio" style={{height: '100px' }} defaultValue={this.state.bio} onChange={(e) => this.setState({bio:e.target.value})} />
              </Form.Group>
              <div>
              <DatePickers />
                </div>
              <Form.Group controlId="formCategory4">
              <Form.Label>
          <h6 class="labeltexte">
            عکس پروفایل
           </h6>
            </Form.Label>
             <Form.Control type="file" accept="image/png , image/jpg , image/jpeg, image/gif, image/jpeg" name="profileImage"
            onChange={this.changeProfileImage}/>
            </Form.Group>
             */}
           
        <br/>
                    {/* <Link style={{color:'#6632a1' ,}} to="/"  >
                   <Button variant="primary" size="lg" className="buttone" onClick={this.UpdateProfileHandler} >
                       ثبت
                   </Button>
                       </Link>
                                      */}
        <br></br>
        <br></br><br></br>
        
        </Form>
        
        </div>        
        </div>
    )
}
}

const mapStatetoProps=(state)=>{
    return{
        user_id:state.user.userDetails.userid,
        username:state.user.userDetails.username,
       email:state.user.email,
       profileImage: state.user.profileImage,
       msg:state.user.msg
    }
   }
   
   
   export default UserProfile;
//    export default connect(mapStatetoProps)(UserProfile);














// <div class="edit">
//         <Container>
    //     <Row>
    //    <Col>
    //    <img src={profilePic} alt="profils pic" />
    //    </Col>
    //     <Col>
//             <h1>User Profile</h1>
//             <Form className="form">     
//     {/* <p>{this.state.msg}</p> */}
//   <Form.Group controlId="formCategory1">
//     <Form.Label>
//     <h5 className="labeltexte">
//             علاقه مندی ها
//           </h5>
//     </Form.Label>
//     <Form.Control type="text" defaultValue={this.state.username}/>
  
  // </Form.Group>
  // <Form.Group controlId="formCategory2">
  //   <Form.Label>firstname</Form.Label>
  //   <Form.Control type="firstname" defaultValue={this.state.firstname} />
  
  // </Form.Group>
  // <Form.Group controlId="formCategory3">
  //   <Form.Label>lastname</Form.Label>
  //   <Form.Control type="lastname" defaultValue={this.state.lastname} />
  
  // </Form.Group>

  // <Form.Group controlId="formCategory4">
  //   <Form.Label>bio</Form.Label>
  //   <Form.Control type="bio" defaultValue={this.state.bio} />
  
  // </Form.Group>
 
//   <Form.Group controlId="formCategory4">
//     <Form.Label>Profile Image</Form.Label>
//     <Form.Control type="file" accept="image/png , image/jpg , image/jpeg, image/gif, image/jpeg" name="profileImage" onChange={this.changeProfileImage}/>
//     </Form.Group>
//   <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
//   </Form>
//    </Col>

//        </Row>
//         </Container>
//         </div>


















// <div class="valid_class"  className="form-group" className="mb-3" className="atext" >
//                 <input name='firstname'   style={{height: '47px'}} size="lg" defaultValue={this.state.firstname} type="text" 
//                 className="form-control" onChange={(e) => this.setState({firstname:e.target.value})}></input>
//                 {/* <TextField id="standard-basic" label="Standard" variant="firstname" /> */}

//                 {/* <div className="warningtexte">{this.state.errors["firstname"]}</div> */}
//               </div>
        
            
//               <div className="form-group" className="mb-3" >
//                 <input name='lastname'  style={{height: '47px' }} size="lg"  type="text" className="form-control" defaultValue={this.state.lastname}
//                    onChange={(e) => this.setState({lastname:e.target.value})}></input>
//                 {/* <div className="warningtexte">{this.state.errors["lastname"]}</div> */}
//               </div>
        
        
//               <div className="form-group" className="mb-3">
//                 <label className="labeltexte">استفاده از حروف و( _ ) در بینش در  نام کاربری مجازه.</label>
//                 <input name='username'  style={{height: '47px' }} size="lg"  defaultValue={this.state.username} type="text" className="form-control"
//                 onChange={(e) => this.setState({username:e.target.value})}></input>
//                 {/* <div className="warningtexte">{this.state.errors["username"]}</div> */}
//               </div>
        
//               <div className="form-group" className="mb-3">
//                 <input name='bio'  style={{height: '100px' }} size="lg"  defaultValue={this.state.bio} type="text" className="form-control"
//                  onChange={(e) => this.setState({bio:e.target.value})}></input>
//                 {/* <div className="warningtexte">{this.state.errors["bio"]}</div> */}
//               </div>








