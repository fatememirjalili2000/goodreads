import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Myheart from '../addtofavorites/Myheart';
import './SearchBar.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest
	})
}));

export default function SearchResultCard({ book }) {
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = (probs) => {
		setExpanded(!expanded);
	};

	return (
        
    <div className='searchcard' sx={{ maxWidth: 345 }}>
        <Link
							to={{
								pathname: '/bookdesc',
								state: { data: book }
							}}
						>
		{/* // <Card className="card" sx={{ maxWidth: 345 }}> */}
			<CardMedia component="img" height="300" image={book.bookAvatar} alt="Paella dish" />
			<CardContent className="text">
				<Typography className="text" variant="body2" color="text.secondary">
					<h2 className="text">{book.title}</h2>
					<br />
					<h6 className="text">{book.authors}</h6>

					{/* <br />
					<br />
					<br />

					<h6 className="text">{book.genre}</h6>

					<br />
					<br /> */}

					{/* <h7 className="text">
						<Link
							to={{
								pathname: '/bookdesc',
								state: { data: book }
							}}
						>
							توضیحات بیشتر
						</Link>
					</h7> */}
				</Typography>
			</CardContent>
			{/* <CardActions disableSpacing>
			
				<IconButton aria-label="add to favorites">
					<Myheart myitem={book} />
				</IconButton>

				<IconButton aria-label="rate">
					<Rating myitem={book} />
				</IconButton>

				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				
			</CardActions> */}
			
		{/* // </Card> */}
        </Link>
        </div>
	);
}
