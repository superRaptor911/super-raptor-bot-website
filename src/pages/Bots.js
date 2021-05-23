import {useEffect , useState} from "react";
import Paper from '@material-ui/core/Paper';
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { ArrowLeft } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    margin: 'auto',
    width: '100%',
    maxWidth: 1000,
    alignItems: 'center'
  },
  paper: {
    margin: 20,
    padding: 20,
    backgroundColor: '#eff7f6',
    borderRadius: 20,
    //minHeight: '50vh',
  },
  text : {
    //textAlign: 'left',
    fontSize: 32.0,
    fontWeight: 400,
    '@media screen and (max-width: 1100px)':{
        fontSize: 27.0,
    },
    '@media screen and (max-width: 840px)':{
        fontSize: 20.0
    },
  },
  transparent:{
    //border: '1px solid black',
    marginTop: 10,
    paddingTop: 20,
    height: 'auto',
    minHeight: '80vh',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(197, 243, 241, 0.12)'
  },
  title:{
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
  },
});

const Bots = () => {
  const classes = useStyles();
  const [target, setTarget] = useState({uri: `${serverAddress}/bot.php`, data: {
    type: 'botCount',
  }});

  const [currentStatus, setCurrentStatus] = useState("");
  const [botCount, setBotCount] = useState(0);
  const serverResponse = useFetch(target);


  const [threadList, setThreadList] = useState();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
      console.log("error")
    }
    else if (serverResponse.data) {
      if (!serverResponse.data.result) {
        setCurrentStatus(serverResponse.data.err);
      }
      else {
        setCurrentStatus("");
        setBotCount(serverResponse.data.count);
      }
    }
  }, [serverResponse.error, serverResponse.data])

  return (
    <div className={classes.root}>
      <Typography  className={classes.title}>
        BOTS ONLINE
      </Typography>
      <Divider/>
      <div className = {classes.transparent}>
      <Paper className={classes.paper}>
        <Typography className={classes.text} variant="h4">
          Currently {botCount} bots online
        </Typography>
      </Paper>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
      </div>
    </div>
  );
}


export default Bots
