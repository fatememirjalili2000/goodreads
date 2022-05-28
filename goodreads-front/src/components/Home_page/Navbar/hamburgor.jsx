import React from 'react';
import '../../fonts/Vazir.ttf'
import './homestyles.scss'
import { FaHeart,FaSearch } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';


const Hamburgormenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`hamburger-button ${isOpen ? "open" : "close"}`}
      />
      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul>
          <li>
            <a href="#">
            <MenuItem
              component={Link} to='/login'
              >
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                    <LoginIcon   />
                </IconButton>
                  <h5 className="text">
                    ورود
                  </h5>
              </MenuItem> 
            </a>
          </li>
          <li>
            <a href="#">
            <MenuItem
            component={Link} to='/register2'
            >
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                  <HowToRegIcon />
              </IconButton>
              <h5 className="text">
                  ثبت نام
                </h5>
            </MenuItem>
            </a>
          </li>
          
          <li>
            <a href="#">
            <MenuItem
      component={Link} to='/register2'
      >
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
            <LogoutIcon />
        </IconButton>
        <h5 className="text">
          خروج 
        </h5>
      </MenuItem>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hamburgormenu;
