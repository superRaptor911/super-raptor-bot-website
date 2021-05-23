import {useEffect , useState} from "react";
import Paper from '@material-ui/core/Paper';
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import oops from '../components/images/oops.png';
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
    borderRadius: 20,
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
    marginLeft: 10,
    //backgroundImage: 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )',
    backgroundColor: '#001219',
    '&:hover':{
      backgroundColor: '#1da1f2',
      
      color: '#001219',
    },
    '@media screen and (max-width: 1024px)':{
      fontSize: 17,
      marginRight: 15
    },
    '@media screen and (max-width: 750px)':{
      fontSize: 15, 
      marginRight: 5,
    },
  },

  deleteButton: {
    height: 50,
    borderRadius: 50,
    fontSize: 20,
    width: 150,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 10,
    color: '#ffffff',

    //backgroundImage: 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )',
    backgroundColor: '#fd3535',
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
    //minHeight: '60vh',
    height: 'auto',
    width: 'auto',
    borderRadius: 20,
    backgroundColor: 'rgba(197, 243, 241, 0.12)',
    '@media screen and (max-width: 1024px)':{
      padding: 6, 
    },
  },
 
  thread_Item: {
    margin: 20,
    padding: 20,
    backgroundColor: '#eff7f6',
    borderRadius: 20,
    minHeight: '50vh',
  },
  threadText : {
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
  image:{
    maxHeight: 250,
    maxWidth: 250,
    marginTop: '5%',
  },
  imgsec:{
    textAlign: 'center',
    
  }
});

function genThreadList(threads, classes, history, deleteFunc) {
  threads.sort(sortBy("threadID", "desc"))
  if (threads.length > 0) {
    return (
      <div>
        {threads.map((thread) => (
          <Paper key={thread.threadID} className={classes.threadItem}>
            <Typography className={classes.threadItemTitle}> {thread.title}</Typography>
            <Button 
              className = {classes.deleteButton}
              type = ''
              variant = 'contained'

              onClick= {() => {deleteFunc(thread.threadID)}}
            >
              Delete
            </Button>

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

  return (
    <Paper className={classes.thread_Item}>
      <Typography  className={classes.threadText}>
        Oops! You don't have any saved threads, use @threadRipperBot save
      </Typography>
      <div className={classes.imgsec}>
      <img
      className={classes.image}
      src = {oops}
      />
      </div>
    </Paper>
  )
}

const Dashboard = () => {
  const classes = useStyles();
  const [target, setTarget] = useState({uri: `${serverAddress}/threads.php`, data: {
    type: 'listThreads',
    name: getCookie("username"),
  }});
  const [target2, setTarget2] = useState({uri: "", data: ""});

  const [currentStatus, setCurrentStatus] = useState("");
  const serverResponse = useFetch(target);
  const serverResponse2 = useFetch(target2);

  const history = useHistory();

  const [threadList, setThreadList] = useState();

  if (getCookie("username" === "")) {
    history.push("/");
  }

  const deleteFunc = (threadID) => {
    setTarget2({uri: `${serverAddress}/threads.php`, data: {
      type: 'removeThread',
      threadID: threadID,
    }})
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
        setThreadList(genThreadList(serverResponse.data.threads, classes, history, deleteFunc));
      }
    }
  }, [serverResponse.error, serverResponse.data])

  // Check server response
  useEffect(() => {
    if (serverResponse2.error.error) {
      setCurrentStatus(serverResponse2.error.msg);
      console.log("error deleting")
    }
    else if (serverResponse2.data) {
      if (!serverResponse2.data.result) {
        setCurrentStatus(serverResponse2.data.err);
      }
      else {
        setCurrentStatus("");
        setTarget({uri: `${serverAddress}/threads.php`, data: {
          type: 'listThreads',
          name: getCookie("username"),
        }});
      }
    }
  }, [serverResponse2.error, serverResponse2.data])

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
