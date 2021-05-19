// File for Navbar component
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SideDrawer from "./SideDrawer";
import {getCookie, setCookie} from "./Utility";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    top: 0,
    position: 'fixed',
    marginBottom: 0,
    background: 'radial-gradient( circle farthest-corner at 22.4% 21.7%,  rgba(4,189,228,1) 0%, rgba(4,183,185,1) 100.2% )'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
  username: {
    display: "block",
    marginRight: 'auto',
    marginLeft: 'auto',
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
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

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
            <Avatar 
              className={classes.medium}
              alt="Twitter"
              src={"https://cdn0.iconfinder.com/data/icons/user-44/512/Bot-512.png"}
            />
          </Button>
          <Typography variant="h6" className={classes.title}>
            ThreadRipper
          </Typography>
          <Button color="inherit" className={classes.username}>{getCookie("username")}</Button>
          {getCookie("username") !== "" && (<Button color="inherit" onClick={handleLogout}>Logout</Button>)}
        </Toolbar>
      </AppBar>
      <div className={classes.emptyDiv}></div>
    </div>
  );
}

export default Header
