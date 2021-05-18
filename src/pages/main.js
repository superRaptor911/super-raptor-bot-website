import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TwitterLogin from "react-twitter-login";
import {getCookie, setCookie} from '../components/Utility';
import {useState} from 'react';
import {useHistory} from 'react-router';

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
  },
  transparent:{
    //border: '1px solid black',
    paddingTop: 20,
    height: '80vh',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(197, 243, 241, 0.12)'
  },

  paper: {
    margin: 20,
    padding: 20,
    backgroundColor: '#eff7f6',
    borderRadius: 20,
  },
  title : {
    textAlign: 'left',
    fontSize: 32.0,
    fontWeight: 400,
    '@media screen and (max-width: 1100px)':{
        fontSize: 27.0,
    },
    '@media screen and (max-width: 840px)':{
        fontSize: 20.0
    },
  },
  login: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    
  }

});


function Main() {

  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const history = useHistory();

  const username = getCookie("username");
  if (username !== "") {
    // Go to dash board
    window.location.href ="/dashboard";
  }

  const authHandler = (err, data) => {
    console.log(err, data);
    if (err) {
      // Error
    } else {
      setCookie("username", data.screen_name);
      setUserName(data.screen_name);
    }

  
  };

  return (
    
    
    <div className={classes.root}>
      <div className={classes.transparent}>
      <Paper className={classes.paper}>
        <Typography  className={classes.title}>
          Say hi 👋  to Thread Ripper botnet for twitter!
          <br/><br/>
          Don't know how to use 🤔? Just tag "@super_raptor911 save" to save a twitter thread 🐦.
          <br/>
          <br/>
          Login with twitter to view/download your saved threads
        </Typography>
      </Paper>

      <div >
        <TwitterLogin
          authCallback={authHandler}
          consumerKey={"DfeZW6qR4AYtjKdOhlBLxoSzO"}
          consumerSecret={"hk9CSrj5eNZdWk4EuE524h5UiRwfYCsONSlrRcTF0Ew2SNL7tr"}
          className={classes.login}
          buttonTheme={"dark"}
        />   
      </div>
      </div>
    </div>
    
    
  );
}

export default Main;
