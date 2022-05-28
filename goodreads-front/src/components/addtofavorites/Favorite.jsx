import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Container } from "@mui/material";
import { Row,Col } from 'reactstrap';
import './favorites.css'
import FavorRecipeReviewCard from './RecipeReviewCard';
import axios from 'axios';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './favorites.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




class Favorite extends React.Component {
  constructor() {
    super();// to call the state
    this.state = { //behaviour of components and how to render
      items:[],
      value:0,
    }
  }
  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  };

  componentDidMount() {

    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/loadbook/',
    };

    axios(config)
    .then((response) => {
      let array = [];
      for (let index = 0; index < response.data.length; index++) {
        if(response.data[index].favourite)
        {
          array.push(response.data[index]) 
        }
        const element = array[index];
        
      }
      // console.log("favoourite add =>",array);
      this.setState({items:array})
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    
  }
  handleheart = () => {
    // console.log("fatemeh click heart")
  }

  render() {
    
    const content = this.state.items.map((item) =>
    
      <Col md={3}>
      <FavorRecipeReviewCard
        key={item.id} book={item}
        ></FavorRecipeReviewCard>
         </Col>
    
    );
    return (
      
      <div className="page">   
        {/* <BasicTabs item={this.state.items }></BasicTabs> */}
        <Box sx={{ width: '100%' }}>
      <Box className="tabs" sx={{ borderColor: 'divider' }}>
      {/* //borderBottom: 2, */}
        <Tabs  value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
          <Tab 
          label={<h6 class="text">
            کتاب های مورد علاقه
          </h6>} 
          {...a11yProps(0)} />
          <Tab label={<h6 class="text">
            کتاب هایی که خوانده ام
          </h6>}  {...a11yProps(1)} />
          <Tab label={<h6 class="text">
            کتاب هایی که قرار است بخوانم
          </h6>}  {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={this.state.value} index={0}>
        
      <Row>
      {content}  
        
      </Row>
      
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        {/* Item Two */}
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        {/* Item Three */}
      </TabPanel>
    </Box>


      

       </div>
    )
  }
}


export default Favorite; 




function BasicTabs(props) {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const content = props.item.map((item) =>
    <Col md={3}>
      <FavorRecipeReviewCard
        key={item.id} book={item}
        ></FavorRecipeReviewCard>
         </Col>
    );

  return (
  
    <Box sx={{ width: '100%' }}>
      <Box className="tabs" sx={{ borderColor: 'divider' }}>
      {/* //borderBottom: 2, */}
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
          label={<h6 class="text">
            کتاب های مورد علاقه
          </h6>} 
          {...a11yProps(0)} />
          <Tab label={<h6 class="text">
            کتاب هایی که خوانده ام
          </h6>}  {...a11yProps(1)} />
          <Tab label={<h6 class="text">
            کتاب هایی که قرار است بخوانم
          </h6>}  {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="cards">
      {/* <Row>
      {content}      
      </Row> */}
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Item Two */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Item Three */}
      </TabPanel>
    </Box>
  
  );
}