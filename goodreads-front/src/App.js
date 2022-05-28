import React,{Component} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/Login";
import Home from "./components/Home_page/Home"
import MyNav from "./components/Home_page/Navbar/MyNav";
import Register from "./components/Register/Register2";
import { BrowserRouter, Redirect , Switch, Route } from "react-router-dom";
// import Search from './components/Search/Search';
import initialDetails from './components/Data/initialDetails';
import Favorite from "./components/addtofavorites/Favorite";
import Edit from "./components/Edit_profile/Edit"
// import image from "./components/Edit_profile/image";
import Bookdesc from "./components/Home_page/bookdesc";
import PrimarySearchAppBar from "./components/Home_page/Navbar/MyNav";
// import UserProfile from "./components/Edit_profile/UserProfile"
import Profile from "./components/Profile/profile";
import Publicpro from "./components/publicprofile/publicpro"
import axios from "axios";
import LoggedInPrimarySearchAppBarloggedin from "./components/Home_page/Navbar/Loggedinnav";
import SearchBar from "./components/Search/SearchBar";
import FooterPagePro from "./components/Home_page/Footer/Footer";
import "./components/Home_page/Footer/Footer.css"
import DefaultUserPic from "./components/Images/a2.jpg"


class App extends Component{
       
    constructor() {
      super();// to call the state
      this.state = { //behaviour of components and how to render
        items:[],
        profileImage:'',
      }
    }

    componentDidMount() {
      var config1 = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/account/properties/',
        headers: { 
          'Authorization': 'Token '+ localStorage.getItem('token'), 
  
        }
      };
  
      axios(config1)
      .then((response) => {
        
        if( JSON.stringify(response.data.image) )
        {
            this.setState({profileImage:JSON.stringify(response.data.image).replace(/['"]+/g, '')});
          
        }
      })
      .catch(function (error) {
        // console.log(error);
      }); 




      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/loadbook/',
      };
  
      axios(config)
      .then((response) => {
        this.setState({items:response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    


    render () {      
      var profilePic = null;
      // console.log(this.state.profileImage);
      if(this.state.profileImage){
          
          var imagestr=this.state.profileImage;
          imagestr = imagestr.replace(/['"]+/g, '');
          profilePic=imagestr;
          
      }
      else{
          profilePic=DefaultUserPic;
      }

      return (
        <BrowserRouter>
          <div className="App">
            {localStorage.getItem('token') === null ?<PrimarySearchAppBar /> : <LoggedInPrimarySearchAppBarloggedin proimage={profilePic}/> }
            <div className="auth-wrapper">
              <div className="auth-inner ">
                <Switch>
                <Route exact path="/" component={Home}></Route>
                  {/* <Route exact path="/Search" component={Search}><Search details={this.state.items}/></Route> */}
                  {/* <Route exact path="/Search" component={SearchBar}><SearchBar placeholder="Enter a Book Name..." data={this.state.items} /></Route> */}
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/edit" component={Edit}></Route>
                  <Route exact path="/register2" component={Register}></Route>
                  <Route exact path="/favorite" component={Favorite}></Route>  
                  {/* <Route exact path="/image" component={image}></Route>    */}
                  <Route path="/bookdesc" component ={Bookdesc} ></Route>
                  {/* <Route path="/userprofile" component={UserProfile}/> */}
                  <Route path="/profile" component={Profile}/>
                  {localStorage.getItem('token') === null ? null : <Route path="/publicprofile/:username" component={Publicpro} /> }
                  

                  {/* <Route exact path="/login">
                  {!localStorage.getItem('token') ? <Redirect to="/" /> : <Home />}
                </Route> */}
                </Switch>
              </div>
            </div>
          </div>

          <div className="footer">
          <FooterPagePro></FooterPagePro>
        </div>
        </BrowserRouter>
      );
    }
}

export default App;