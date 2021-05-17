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
  paper: {
    padding: 20,
  },
  title : {
    textAlign: 'center',
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
    history.push("/dashboard");
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
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          Say hi to Super Raptor Bot for twitter!
          <br/>
          Usage: Tag "@super_raptor911 save" to save a twitter thread.
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
  );
}

export default Main;
