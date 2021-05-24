import {useEffect , useState} from "react";
import Paper from '@material-ui/core/Paper';
import useFetch from "../components/useFetch";
import {serverAddress} from '../components/Utility';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core'
import { ArrowLeft } from "@material-ui/icons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

function genBotStatusTable(status) {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BOT ID</TableCell>
            <TableCell align="center">STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status.map((row, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                <Typography>
                  {row.botName}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography>
                  {row.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Bots = () => {
  const classes = useStyles();
  const [target, setTarget] = useState({uri: `${serverAddress}/bot.php`, data: {
    type: 'status',
  }});

  const [currentStatus, setCurrentStatus] = useState("");
  const [botsTable, setBotsTable] = useState(genBotStatusTable([]));
  const [timeoutCounter, setTimeoutCounter] = useState();
  const serverResponse = useFetch(target);


  const [threadList, setThreadList] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Refreshing data');
      setTarget({uri: `${serverAddress}/bot.php`, data: { type: 'status'}})
      setTimeoutCounter(timeoutCounter + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [timeoutCounter]);

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
        setBotsTable(genBotStatusTable(serverResponse.data.bots));
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
          {botsTable}
        </Paper>

        <Typography variant="button" color="error">
          {currentStatus}
        </Typography>
      </div>
    </div>
  );
}


export default Bots
