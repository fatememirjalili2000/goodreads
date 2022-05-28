import React,{Component} from "react";
import SearchResultCard from "./resultcard"; 
import { Row, Col, Container } from 'reactstrap';
import Searchinrespage from './searchinrespage';
import './SearchBar.css'

class respage extends Component {
  constructor(props){
    super(props)
    this.state={
    }
}  


render()
{
    console.log(this.props.location.state.data);
    const content = this.props.location.state.data.map((item) =>
    
      <Col md={3}>
      <SearchResultCard
        key={item.id} book={item}
        ></SearchResultCard>
         </Col>
    
    );
    return (
        <div>
            <div >
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>    
          <Searchinrespage placeholder="Enter a Book Name..." />
          {/* // data={this.state.items} */}
          <p  className="text">  جست و جو
        : 
            {this.props.location.state.SW}
        </p>
        </div>
       
        
       
            <Row>
                {content}
                </Row>

        </div>
    );
}

}


export default respage;