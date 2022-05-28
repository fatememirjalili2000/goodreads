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
import Myheart from './Myheart';
import './favorites.css';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

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

export default function FavorRecipeReviewCard({ book }) {
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = (probs) => {
		setExpanded(!expanded);
	};

	return (
		<Card className="card" sx={{ maxWidth: 345 }}>
			<CardMedia component="img" height="300" image={book.bookAvatar} alt="Paella dish" />
			<CardContent className="text">
				<Typography className="text" variant="body2" color="text.secondary">
					<h2 className="text">{book.title}</h2>
					<br />
					<h6 className="text">{book.authors}</h6>

					<br />
					<br />
					<br />

					<h6 className="text">{book.genre}</h6>

					<br />
					<br />

					<h7 className="text">
						<Link
							to={{
								pathname: '/bookdesc',
								state: { data: book }
							}}
						>
							توضیحات بیشتر
						</Link>
					</h7>
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        */}
				<IconButton aria-label="add to favorites">
					<Myheart myitem={book} />
				</IconButton>

				<IconButton aria-label="rate">
					<Rating myitem={book} />
				</IconButton>

				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				{/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
			</CardActions>
			{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add ching 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very ghave opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
		</Card>
	);
}
