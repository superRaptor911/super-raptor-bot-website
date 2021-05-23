import {useEffect , useRef, useState} from "react";
import Paper from '@material-ui/core/Paper';
import {useHistory, useParams} from "react-router";
import useFetch from "../components/useFetch";
import {getCookie, serverAddress, sortBy} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { Button, Divider, makeStyles } from '@material-ui/core'
// import Button from '@material-ui/core/Button'
import Tweet from "../components/Tweet";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
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
    marginTop: 5,
    padding: 20,
    backgroundColor: 'rgba(197, 243, 241, 0.12)',
    overflowX: 'auto',
    borderRadius: 20,
    display: 'flex',
    flex: 1,
    boxShadow: 'none',
    '@media screen and (max-width: 650px)':{
      padding: 5,
      width: 'auto'
    },
  },
  title : {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bolder',
    '@media screen and (max-width: 1000px)':{
        fontSize: 30,
    },
    '@media screen and (max-width: 750px)':{
      fontSize: 25,
      marginBottom: 5,
  },
  },
  threadContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    
  },
  subTweet: {
    marginLeft: 30,
    '@media screen and (max-width: 650px)':{
      marginLeft: 20,
      marginRight: 0,
    },
  },
  btn:{
    textAlign: 'center',
  },
  pdfButton: {
    margin: 10,
    padding: 5,
    minWidth: 200,
    widht: 'auto',
    height: 50,
    color: '#f1faee',
    fontSize: 17,
    borderRadius: 50,
    backgroundColor: '#001219',
    '&:hover':{
      backgroundColor: '#f1faee',
      color: '#001219',
    },
  },
  popup: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

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
  const [showPopup, setShowPopup] = useState(false);
  const serverResponse = useFetch(target);

  const history = useHistory();
  const ref = useRef();

  const [tweets, setTweets] = useState();

  // Check server response
  useEffect(() => {
    if (serverResponse.error.error) {
      setCurrentStatus(serverResponse.error.msg);
      history.push("/");
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

  // Function to save pdf
  const convertToPdf = () => {
    setShowPopup(true);
    // For mobile
    ref.current.style.width = ref.current.scrollWidth + "px";
    html2canvas(ref.current, {letterRendering: 1, useCORS : true, scrollY: -window.scrollY, scrollX: -window.scrollX ,scale: 2, 
      width: ref.current.scrollWidth
    }).then(canvas => {
      // Convert HTML to png
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log(`image width, height = (${imgProps.width}, ${imgProps.height})`);

      let posY = 0;
      let heightLeft = pdfHeight
      pdf.addImage(imgData, 'PNG', 0, posY, pdfWidth, pdfHeight, undefined,'FAST');
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        posY = heightLeft - pdfHeight;

        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, posY, pdfWidth, pdfHeight, undefined,'FAST');
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      setShowPopup(false);
      // pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf"); 
    });
  }

  const popupBody = (
    <div  className={classes.popup}>
      <Typography variant="h4" className={classes.title}>
        Generating PDF!!
      </Typography>
      <Typography variant="h5" className={classes.title} color={"error"}>
       Hold on, it may take a while
      </Typography>
    </div>
  );


  return (
    <div className={classes.root}>
      <Typography  className={classes.title}>
        THREAD
      </Typography>

      <Modal
        open={showPopup}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {popupBody}
      </Modal>

      <div className = {classes.btn}>
      <Button onClick={convertToPdf} className= {classes.pdfButton}>
        save as pdf
      </Button>
      </div>
      <Divider/>

      <Paper className={classes.paper} ref={ref}>
        {tweets}
      </Paper>
      <Typography variant="button" color="error">
        {currentStatus}
      </Typography>

      <br/>
      <br/>
    </div>
  );
}
export default ViewThread
