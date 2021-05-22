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
    padding: 20,
  },
  title : {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bolder'
  },
  threadItem: {
    //backgroundColor: '#549aea',
    backgroundImage: 'radial-gradient( circle 993px at 0.5% 50.5%,  rgba(137,171,245,0.37) 0%, rgba(245,247,252,1) 100.2% )',
    display: 'flex',
    //justifyItems: 'center',
    padding: 8,
    height: 100,
    width: 'auto',
    margin: 15,
    borderRadius: 25,
    '@media screen and (max-width: 1024px)':{
      margin: 10,
      padding: 6, 
    },
    '@media screen and (max-width: 750px)':{
      margin: 5,
      marginBottom: 10,
      padding: 4, 
    },
  },
  viewButton: {
    height: 50,
    borderRadius: 50,
    fontSize: 20,
    width: 150,
    margin: 30,
    //backgroundImage: 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )',
    backgroundColor: '#001219',
    '&:hover':{
      backgroundColor: '#1da1f2',
      color: '#001219',
    },
    '@media screen and (max-width: 1024px)':{
      fontSize: 17,
    },
    '@media screen and (max-width: 750px)':{
      fontSize: 15, 
    },
  },
  
  threadListContainer: {
    marginTop: 20,
  },
  transparent:{
    //border: '1px solid black',
    padding: 20,
    margin: 10,
    height: 'auto',
    width: 'auto',
    borderRadius: 20,
    backgroundColor: 'rgba(197, 243, 241, 0.12)',
    '@media screen and (max-width: 1024px)':{
      padding: 6, 
    },
  },
  threadItemTitle: {
    marginLeft: 5,
    marginRight: 5,
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

function genThreadList(threads, classes, history) {
  threads.sort(sortBy("threadID", "desc"))
  return (
    <div>
      {threads.map((thread) => (
        <Paper key={thread.threadID} className={classes.threadItem}>
          <Typography className={classes.threadItemTitle}> {thread.title}</Typography>
          <Button
            className= {classes.viewButton}
            type="submit" 
            color="primary" 
            variant="contained"
            onClick= {() => {history.push("/thread/" + thread.threadID)}}
          >
            View
          </Button>
        </Paper>
      ))}
    </div>
  );
}

const Dashboard = () => {
  const classes = useStyles();
  const [target, setTarget] = useState({uri: `${serverAddress}/threads.php`, data: {
    type: 'listThreads',
    name: getCookie("username"),
  }});
  const [currentStatus, setCurrentStatus] = useState("");
  const serverResponse = useFetch(target);

  const history = useHistory();

  const [threadList, setThreadList] = useState();

  if (getCookie("username" === "")) {
    history.push("/");
  }

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
        setThreadList(genThreadList(serverResponse.data.threads, classes, history));
      }
    }
  }, [serverResponse.error, serverResponse.data])

  return (
    <div className={classes.root}>
      <Typography  className={classes.title}>
        DASHBOARD
      </Typography>

      <Divider/>
      <div className={classes.transparent}>
      <div className={classes.threadListContainer}>
        {threadList}
      </div>
      </div>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </div>
  );
}

export default Dashboard
