import React, { Component } from 'react';
import '../Home_page/Navbar/homestyles.scss'
import initialDetails from '../Data/initialDetails';
import '../fonts/Vazir.ttf'
import FooterPagePro from './Footer/Footer';
import "./bookbluestyle.scss";
import { Link } from 'react-router-dom';
import './Home.css'
import axios from 'axios';
import './filter.scss';

import HomeRecipeReviewCard from './homecard';
import '../addtofavorites/Myheart';
import { Row, Col, Container } from 'reactstrap';
import SearchBar from '../Search/SearchBar';


//Originally had this in Vue, but it turned out to be more work than vanilla JS, so ¯\_(ツ)_/¯


export default class Home extends Component {
  constructor() {
    super();// to call the state
    this.state = { //behaviour of components and how to render
      items: [],
      from:'',
      isstory:false,
      issocial:false,
      ispsychology:false,
      ishistoric:false,
      isarty:false,
      iso:false,
      ist:false,
      isn:false,
      isa:false,
      isz:false,
      isch:false,
      isne:false
    
    }
    this.handlefilter = this.handlefilter.bind(this);
    this.handleinpyear = this.handleinpyear.bind(this);
  }


  componentDidMount() {
   
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/loadbook/',
        // headers: { 
        //   'Authorization': 'Token '+ localStorage.getItem('token'), 
        // }
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.setState({ items: response.data })
        })
        .catch(function (error) {
          console.log(error);
        });
    
    // console.log(this.state.items);
  }


  onChangestory = (e) => {
    console.log("in story");
    this.setState(initialState => ({
      isstory: !initialState.isAvocado,
    }));
  }
  handlefilter(e){
    console.log("****filter")

    let filterq = '';
    let filterp = '';
    if(this.state.isstory)
    {
      filterq += 'داستانی'
    }
    if(!this.state.isstory)
    {
      filterq = filterq.replace('داستانی','');
    }
    if(this.state.ispsychology)
    {
      filterq += 'روانشناسی' 
    }
    if(!this.state.ispsychology)
    {
      filterq = filterq.replace('روانشناسی','') 
    }
    if(this.state.issocial)
    {
      filterq += 'اجتماعی'
    }
    if(!this.state.issocial)
    {
      filterq.replace('اجتماعی','');
    }
    if(this.state.ishistoric)
    {
      filterq += 'تاریخی'
    }
    if(!this.state.ishistoric)
    {
      filterq = filterq.replace('تاریخی','')
    }
    if(this.state.isarty)
    {
      filterq += 'هنر'
    }
    if(!this.state.isarty)
    {
      filterq = filterq.replace ('هنر','')
    }
    if(this.state.iso)
    {
      filterp += 'افق'
    }
    if(!this.state.iso)
    {
      filterp = filterp.replace('افق','');
    }
    if(this.state.ist)
    {
      filterp += 'طاووس'
    }
    if(!this.state.ist)
    {
      filterp = filterp.replace('طاووس','');
    }
    if(this.state.isn)
    {
      filterp += 'ناهید'
    }
    if(!this.state.isn)
    {
      filterp = filterp.replace('ناهید','');
    }
    if(this.state.isa)
    {
      filterp += 'آموت'
    }
    if(!this.state.isa)
    {
      filterp = filterp.replace('آموت','');
    }
    if(this.state.isz)
    {
      filterp += 'ذهن آویز'
    }
    if(!this.state.isz)
    {
      filterp = filterp.replace('ذهن آویز','');
    }
    if(this.state.isch)
    {
      filterp += 'چشمه'
    }
    if(!this.state.isch)
    {
      filterp = filterp.replace('چشمه','');
    }
    if(this.state.isne)
    {
      filterp += 'نگاه'
    }
    if(!this.state.isne)
    {
      filterp = filterp.replace('نگاه','');
    }
    

    // http://127.0.0.1:8000/category/?genre=روانشناسی&publication_date__year=2017&publisher
    let Myurl = "http://127.0.0.1:8000/category/?genre=" + filterq + "&" + "publication_date__year=" + this.state.from + "&"+"publisher=" + filterp; 
    // console.log(Myurl);

    var config = {
      method: 'get',
      url: Myurl,
    };

    axios(config)
      .then((response) => {
        // console.log(response.data);
        this.setState({ items: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleChange(e, value) {
    let isChecked = e.target.checked;
    console.log("checked =>",isChecked);
    if( ( value == "داستانی"))
    {
      this.setState({
        isstory:isChecked });
    }
    if( ( value == "اجتماعی"))
    {
      this.setState({
        issocial:isChecked });
    }
    if( ( value == "روانشناسی"))
    {
      this.setState({
        ispsychology:isChecked });
    }
    if(( value == "تاریخی"))
    {
      this.setState({
        ishistoric:isChecked });
    }
    if(( value == "هنر"))
    {
      this.setState({
        isarty:isChecked });
    }
    if( ( value == "افق"))
    {
      this.setState({
        iso:isChecked });
    }
    if( ( value == "طاووس"))
    {
      this.setState({
        ist:isChecked });
    }
    if( ( value == "ناهید"))
    {
      this.setState({
        isn:isChecked });
    }
    if( ( value == "آموت"))
    {
      this.setState({
        isa:isChecked });
    }
    if( ( value == "ذهن آویز"))
    {
      this.setState({
        isz:isChecked });
    }
    if( ( value == "چشمه"))
    {
      this.setState({
        isch:isChecked });
    }
    if( ( value == "نگاه"))
    {
      this.setState({
        isne:isChecked });
    }
  }
  handleinpyear(e) {
    this.setState({from:e.target.value});
  }

  render() {

    // console.log("story",this.state.isstory)
    // console.log("social",this.state.issocial)
    // console.log("psy",this.state.ispsychology)
    // console.log("history",this.state.ishistoric)
    // console.log("art",this.state.isarty)
    

    const content = this.state.items.map((item) =>
      <Col md={3}>
        <HomeRecipeReviewCard
          key={item.id} book={item}
        ></HomeRecipeReviewCard>
      </Col>
    );
    return (
      <div>
        <div className="backgroundimagehome"></div>
            <div><h1 className='titlegood' style={{color:'white'}}>کتابخانه اشتراکی گودریدز</h1></div>
        <div >
          <SearchBar placeholder="Enter a Book Name..." data={this.state.items} />
        </div>



        <div>

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

          <br /><br /><br /><br /><br />
          <div className="fdir">


            <aside id="filters">
              <h1 class="bigHead">جستجوی پیشرفته</h1>

              <div id="type">
                <h1 style={{ textAlign: 'right', fontFamily: 'Vazir' }}>ژانر</h1>
                <div class="bump">
                  <div class="box1">
                    <input type="checkbox" id="clothing" onChange={e => this.handleChange(e, "داستانی")} />
                    <label for="clothing" class="check-box"></label>
                    <h4>داستانی</h4>
                  </div>
                  <div class="box1">
                    <input type="checkbox" id="equipment" onChange={e => this.handleChange(e, "اجتماعی")} />
                    <label for="equipment" class="check-box"></label>
                    <h4>اجتماعی</h4>
                  </div>
                  <div class="box1">
                    <input type="checkbox" id="trips" onChange={e => this.handleChange(e, "روانشناسی")} />
                    <label for="trips" class="check-box"></label>
                    <h4>روانشناسی</h4>
                  </div>
                  <div class="box1">
                    <input type="checkbox" id="social" onChange={e => this.handleChange(e, "تاریخی")} />
                    <label for="social" class="check-box"></label>
                    <h4>تاریخی</h4>
                  </div>
                  <div class="box1">
                    <input type="checkbox" id="profile" onChange={e => this.handleChange(e, "هنر")} />
                    <label for="profile" class="check-box"></label>
                    <h4>هنر</h4>
                  </div>
                </div>
              </div>

              <div id="specials" class="clearfix" style={{ left: '400px', direction: 'rtl', float: 'right', textAlign: 'right' }}>
                <h1 style={{ textAlign: 'right', fontFamily: 'Vazir' }}>نشر</h1>
                <div class="specBump" >
                  <div class="box2">
                    <input type="checkbox" id="onSale" onChange={e => this.handleChange(e, "افق")} />
                    <label for="onSale" class="check-box"></label>
                    <h4>افق</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="newest" onChange={e => this.handleChange(e, "طاووس")} />
                    <label for="newest" class="check-box"></label>
                    <h4>طاووس</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="featured" onChange={e => this.handleChange(e, "ناهید")} />
                    <label for="featured" class="check-box"></label>
                    <h4>ناهید</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="amoot" onChange={e => this.handleChange(e, "آموت")} />
                    <label for="amoot" class="check-box"></label>
                    <h4>آموت</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="zehnaviz" onChange={e => this.handleChange(e, "ذهن آویز")} />
                    <label for="zehnaviz" class="check-box"></label>
                    <h4>ذهن آویز</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="cheshmeh" onChange={e => this.handleChange(e, "چشمه")} />
                    <label for="cheshmeh" class="check-box"></label>
                    <h4>چشمه</h4>
                  </div>
                  <div class="box2">
                    <input type="checkbox" id="negah" onChange={e => this.handleChange(e, "نگاه")} />
                    <label for="negah" class="check-box"></label>
                    <h4>نگاه</h4>
                  </div>
                </div>
              </div>


              
              <div id="priceRange" class="clearfix" style={{ textAlign: 'right', direction: 'rtl' }}>

              
                {/* <h1 id="hdrPriceFilters"><button class="btnFilterHeader sectionExpanded" aria-expanded="true" aria-controls="priceFilters" style={{ fontFamily: 'Vazir', textAlign: 'right', fontSize: '19px' }}>سال انتشار</button></h1> */}
                
                  <h1 style={{ textAlign: 'right', fontFamily: 'Vazir' , color:'#302c2cf3' }}>سال انتشار : <input class="inputPriceFilter" type="text" id="customPriceLow" aria-label="Price Filter Low" maxlength="4" onChange={this.handleinpyear} style={{ height:'25px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px' ,fontSize:'18px',color:'rgba(46, 44, 42, 0.76)',borderColor:'rgba(46, 44, 42, 0.76)' }}  /></h1>
 
                <fieldset id="priceFilters" aria-labelledby="hdrPriceFilters" class="filterSection" style={{ fontFamily: 'Vazir', textAlign: 'right', fontSize: '19px' }}>
                  {/* <h1 id="customPriceFilter" style={{ fontFamily: 'Vazir', textAlign: 'right', fontSize: '13px' }}>:بازه سال نشر</h1> */}
                  {/* <input class="inputPriceFilter" type="text" id="customPriceLow" aria-label="Price Filter Low" maxlength="4" onChange={this.handleinpyear}  /> */}
                  {/* <span class="pricerange"></span>
                  &nbsp;
                  تا    <input class="inputPriceFilter" type="text" id="customPriceHigh" aria-label="Price Filter High" maxLength="4" />
                  &nbsp; &nbsp; */}
                  <br/>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
                  
                  <button id="btnPriceSubmit" onClick={e => this.handlefilter(e)} style={{width:'100px',height:'35px'}} className='bs'>جستجو</button>
                  <div id="priceRangeErrors" aria-live="assertive">

                  </div>
                </fieldset>


              </div>

            </aside>


          </div>
        </div>

        <div class="cards">
          <br /><br />
          <Row >
            {content}
          </Row>

        </div>


      </div>


    )
  }
}














// {/* <div className="App">
//       <SearchBar placeholder="Enter a Book Name..." data={this.state.items} />
//     </div> */}
//         {/* // <div className="txtcard"><CardContainer cards={ this.state.items } /></div> */}













// const Card = (props) => (

//   <div className="card">
//     <img src={props.info.bookAvatar}
//       alt={props.alt || 'Image'} />
//     <div className="card-content">
//       <h2 className="txtcard">{props.info.title}</h2>
//       <p className="txtcard" style={{ fontSize: '17px' }}>{props.info.authors}</p>
//       <div style={{ fontSize: "15px" }} className="txtcard">
//         <Link to={{
//           pathname: '/bookdesc',
//           state: { data: props.info },
//         }}>
//           توضیحات بیشتر
//         </Link>
//       </div>
//       {/* <h2 className="txtcard">{ props.info.Description }</h2> */}
//     </div>
//     {/* <div className="card-content">
//     <RecipeReviewCard>
//          <Link  to={{
//          pathname: '/bookdesc',
//          state: {data : props},
//        }}>
//        read more
//      </Link>
//     </RecipeReviewCard>
//     </div> */}

//   </div>


// );


// const CardContainer = (props) => (
//   <div className="cards-container">
//     {
//       props.cards.map((card) => (
//         <Card
//           id={card.pk}
//           info={card}
//         />

//       ))
//     }
//   </div>
// );

