import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Myheart from '../addtofavorites/Myheart';
import { Link } from 'react-router-dom';
import './Home.css';
import { Rating } from '@mui/material';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function HomeRecipeReviewCard({book}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (probs) => {
    setExpanded(!expanded);
  };

  return (
    <div>
    
    <Card className="card" sx={{ maxWidth: 320,maxHeight: 550 }}>
      
      <CardMedia
        component="img"
        // height="300"
        image={book.bookAvatar}
        alt="Paella dish"
        // style={{objectFit:'contain',height:'300px',width:'100%'}}
        
      />
      <CardContent className="text">
        <Typography className="text" variant="body2" color="text.secondary">
          <h2 className="text" style={{fontWeight:'bold',fontFamily:'W_mahboob',fontSize:'30px'}}>{book.title}
    
          </h2>
          <br/><br/>
          <h2 className="text">
          {book.authors}
          </h2>

        

          {/* <h6 className="text">
          {book.genre}
          </h6> */}

          <br/><br/>
          
        <u className="text">
        <Link style={{color:'#565c5c',fontSize:'19px'}} to={{
        pathname: '/bookdesc',
        state: {data : book},
      }}>
      توضیحات بیشتر
     </Link>
      </u>
        </Typography>
        <br/><br/><br/>
        <CardActions disableSpacing>
    
        
		<IconButton aria-label="add to favorites">
        	<Myheart myitem={book}></Myheart>
        </IconButton>
		<IconButton aria-label="share">
          <ShareIcon/>
        </IconButton>
		<IconButton aria-label="rate">
			<Rating myitem={book} />
		</IconButton>

	
      
     
      </CardActions>
      

        
      </CardContent>
     
      
     
    </Card>
    
    </div>
  );
}