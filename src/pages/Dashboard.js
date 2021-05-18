import {useEffect , useState} from "react";
import Paper from '@material-ui/core/Paper';
import {useHistory} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
  },
  paper: {
    padding: 20,
  },
  title : {
    textAlign: 'center',
    marginBottom: 20,
  },
  threadItem: {
    backgroundColor: '#549aea',
    display: 'flex',
    justifyItems: 'center',
    padding: 8,
    marginBottom: 4,
  },
  threadListContainer: {
    marginTop: 20,
  },
  threadItemTitle: {
    marginLeft: 5,
    marginRight: 5,
    width: '60%'
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
        history.push("/");
      }
      else {
        setCurrentStatus("");
        setThreadList(genThreadList(serverResponse.data.threads, classes, history));
      }
    }
  }, [serverResponse.error, serverResponse.data])

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Dashboard
      </Typography>

      <Divider/>
      <div className={classes.threadListContainer}>
        {threadList}
      </div>

      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </div>
  );
}

export default Dashboard
