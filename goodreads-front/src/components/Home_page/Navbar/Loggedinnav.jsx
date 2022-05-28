import {Container, Navbar, Nav} from 'react-bootstrap';
import '../../fonts/Vazir.ttf'
import './homestyles.scss'
import { FaHeart,FaSearch } from "react-icons/fa";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Hamburgormenu from './hamburgor';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DefaultUserPic from "../../Images/a2.jpg"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../../Images/small-4779-61b90ea385d28.png"



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function LoggedInPrimarySearchAppBarloggedin({proimage}) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handlelogout = () => {

    //request to back
    
    localStorage.clear();
    window.location.href = '/';
    // window.location.reload();
  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to='/edit' onClick={handleMenuClose}>
      <h4 className="text">
          <EditIcon   />
            ویرایش مشخصات
          </h4>
      </MenuItem>
      <MenuItem component={Link} to='/profile' onClick={handleMenuClose}>
      <h4 className="text">
          <ManageAccountsIcon />
          حساب من
          </h4>
      </MenuItem>
      <MenuItem  component={Link} to='/' onClick={handlelogout}  >
      <h4 className="text">
          <LogoutIcon />
          خروج
          </h4>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {/* <AccountCircle sx={{color:"#6632a1" }}  /> */}
   {/* alt="avatar" */}
          <Avatar alt="Cindy Baker" src={proimage} />

        </IconButton>
        <h5 className="text">
            حساب شخصی
          </h5>
      </MenuItem>
      <MenuItem
      component={Link} to='/'
      >
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
            <HomeIcon  sx={{color:"#6632a1" }}  />
        </IconButton>
        <h5 className="text">
            خانه
          </h5>
      </MenuItem>
      <MenuItem
      component={Link} to='/favorite'
      >
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
            <FavoriteIcon  className="favor" sx={{color:"#6632a1" }}   />
        </IconButton>
        <h5 className="text">
            علاقه مندی ها
          </h5>
      </MenuItem>
      
    </Menu>
    
  );

  return (
    <div id="navbar">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar class="Appbar"  >
        <Toolbar>
          <div  className="iconbtn">
          <IconButton
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
            aria-controls={menuId}
            component={Link} to='/'
          >
            <h6 className="webtext">
            خانه
            <HomeIcon />
          </h6>
          </IconButton>  
          
          </div>
        
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <div  className="iconbtn">
            <IconButton
              component={Link} to='/favorite'
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <FavoriteIcon sx={{color:"white"}} />
            </IconButton>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
           
              <Avatar 
              alt="Avatar" 
              src={proimage}
              sx={{ width: 37, height: 37 }}
              />
              
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
          {/* <Box
            classname="logo"
            component="img"
            sx={{
            height: 34,
            }}
            alt="Your logo."
            src={logo}
        /> */}

        </Box>
          <Box paddingRight="45rem" sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Hamburgormenu></Hamburgormenu>
          
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{color:"white"}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  </div>
  );
}










