import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from 'react';
import {useHistory, useLocation} from 'react-router';
import {getCookie} from './Utility';
import Avatar from '@material-ui/core/Avatar';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
    textAlign: 'center'
  },
  active: {
    background: '#f4f4f4'
  },
  info: {
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center'
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },

}));

const SideDrawer = () => {
  const classes = useStyles();
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const primaryList = [
    {
      name: "HOME",
      path: "/home"
    },
    {
      name: "COMMANDS",
      path: "/commands"
    },
    {
      name: "GUIDE",
      path: "/guide"
    },
  ];

  const personal = [
    {
      name: "DASHBOARD",
      path: "/dashboard"
    },
    {
      name: "SETTINGS",
      path: "/settings"
    },
  ];

  const siteInfoList = [
    {
      name: "ABOUT",
      path: "/about"
    },
    {
      name: "POLICY",
      path: "/policy"
    },
  ];

  return (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setShowSideDrawer(!showSideDrawer)}>
      <MenuIcon />
      <Drawer open={showSideDrawer}>
        <div role="presentation">
          <div className={classes.info}>
            <Avatar 
              className={classes.medium}
              alt="Twitter"
              src={"https://cdn0.iconfinder.com/data/icons/user-44/512/Bot-512.png"}
            />
            <Typography>
              ThreadRipper v1.0
            </Typography>
          </div>

          <List className={classes.list}>
            {getCookie("username") !== "" && (
              <div>
                {personal.map(item => (
                  <ListItem button onClick={() => history.push(item.path)} key={item.name} className={location.pathname === item.path ? classes.active : null}>
                    <ListItemText primary={item.name}/>
                  </ListItem>
                ))}
                <Divider/>
              </div>
            )}
            {primaryList.map(item => (
              <ListItem button onClick={() => history.push(item.path)} key={item.name} className={location.pathname === item.path ? classes.active : null}>
                <ListItemText primary={item.name}/>
              </ListItem>
            ))}
            <Divider/>


            {siteInfoList.map(item => (
              <ListItem button onClick={() => history.push(item.path)} key={item.name} className={location.pathname === item.path ? classes.active : null}>
                <ListItemText primary={item.name}/>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </IconButton>
  );
}

export default SideDrawer
