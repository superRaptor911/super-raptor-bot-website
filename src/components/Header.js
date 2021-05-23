// File for Navbar component
import React from 'react';
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SideDrawer from "./SideDrawer";
import {getCookie, setCookie} from "./Utility";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from './images/logo.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    top: 0,
    position: 'fixed',
    marginBottom: 0,
    backgroundColor: '#001219',
    //background: 'radial-gradient( circle farthest-corner at 22.4% 21.7%,  rgba(4,189,228,1) 0%, rgba(4,183,185,1) 100.2% )'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
  usernamesec:{
    width: '100%',
    textAlign: 'right'
  },
  /*username: {
    display: "block",
    marginRight: 'auto',
    marginLeft: 'auto',
  },*/
  usernamebutton:{
    color: '#f1faee',
    textTransform: 'none',
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  container: {
    display: 'flex',
    // textAlign: 'right'
  },
  emptyDiv: {
    margin: 100,
  },
  logo:{
    width: 100,
    height: 50,
  }
}));



const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  setAnchorEl(null);
  };

  const handleLogout = () => {
    setCookie("username", "");
    window.location.href ="/";
  }



  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <SideDrawer/>
          <Button onClick={() => history.push('/')}>
            {/*<Avatar 
              className={classes.medium}
              alt="Twitter"
              src={"https://cdn0.iconfinder.com/data/icons/user-44/512/Bot-512.png"}
            /> */}
            <img className={classes.logo}
            src= {logo}
            alt = 'logo'/>

          </Button>
          {/*<Typography variant="h6" className={classes.title}>
            ThreadRipper
          </Typography>*/}
  
          <div className={classes.usernamesec}>

          <Button className={classes.usernamebutton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {getCookie("username")}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleClose}>{getCookie("username") !== "" && (<Button color="inherit" onClick={handleLogout}>Logout</Button>)}</MenuItem>
      </Menu>
         
         {/*<Dropdown color="inherit" className={classes.username} placeholder={getCookie("username")}>{/*getCookie("username")}*/}
          </div>
          {/*getCookie("username") !== "" && (<Button color="inherit" onClick={handleLogout}>Logout</Button>)*/}
        </Toolbar>
      </AppBar>
      <div className={classes.emptyDiv}></div>
    </div>
  );
}

export default Header