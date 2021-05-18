import {useEffect , useRef, useState} from "react";
import Paper from '@material-ui/core/Paper';
import {useHistory, useParams} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
// import Button from '@material-ui/core/Button'
import Pdf from "react-to-pdf";
import Tweet from "../components/Tweet";

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    margin: 'auto',
    width: '95%',
    maxWidth: 1000,
  },
  thread: {
    width: 1000,
  },
  paper: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    overflowX: 'auto',

    display: 'flex',
    flex: 1,
    boxShadow: 'none',
  },
  title : {
    textAlign: 'center',
    marginBottom: 20,
  },
  threadContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  subTweet: {
    marginLeft: 60,
  }
});

function genTweets(tweet, classes) {
  return (
    <div className={classes.threadContainer}>
      <Tweet tweet={tweet.tweet}/>
      <div className={classes.subTweet}>
        {tweet.replies.map((t) => (
          <div key={t.id}>
            {genTweets(t, classes)}
          </div>
        ))}
      </div>
    </div>
  )
}

function showThread(data, classes) {
  let tweet = JSON.parse(data.thread);
  console.log(tweet)
  return genTweets(tweet, classes)
}

const ViewThread = () => {
  const classes = useStyles();
  const {threadid} = useParams();
  const [target, setTarget] = useState({uri: `${serverAddress}/threads.php`, data: {
    type: 'getThread',
    threadID: threadid
  }});
  const [currentStatus, setCurrentStatus] = useState("");
  const [dummy, setDummy] = useState();
  const serverResponse = useFetch(target);

  const history = useHistory();
  const ref = useRef();

  const [tweets, setTweets] = useState();

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
        setTweets(showThread(serverResponse.data.thread, classes))
      }
    }
  }, [serverResponse.error, serverResponse.data])



  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Thread
      </Typography>

      {ref.current && (console.log([ref.current]) || true) && (
        <Pdf targetRef={ref} filename="code-example.pdf" options={{
          orientation: '1', 
          unit: 'pt', 
          format: [ref.current.offsetWidth, ref.current.offsetHeight]
        }
          }>
          {({ toPdf }) => {
            setDummy(1);
            return (<button onClick={toPdf}>Generate Pdf</button>)
          }}
        </Pdf>
      )}

      <Paper className={classes.paper} ref={ref}>
        {tweets}
      </Paper>
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>
    </div>
  );
}
export default ViewThread
