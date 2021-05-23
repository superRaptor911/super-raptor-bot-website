import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
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
paper: {
  margin: 20,
  padding: 20,
  backgroundColor: '#eff7f6',
  borderRadius: 20,
  minHeight: '50vh',
},
text : {
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
});

function Commands(){

    const classes = useStyles();

return (

    <div className={classes.root}>

<Typography className= {classes.title}> COMMANDS </Typography>
<Divider/>
      <div className={classes.transparent}>
        
      <Paper className={classes.paper}>
    
      <Typography  className={classes.text}>
      Reply any Tweet with any of these <b>commands</b> to save them in your dashboard.
<br/><br/>
<b>@threadRipperBot save</b> -- Save a thread (You will get reply from our bot when your request is completed).
<br/><br/>
<b>@threadRipperBot save full</b> -- Save entire thread including replies and sub replies by other people.
                                (Warnig: it's a very slow process and will take lot of time, Max tweets saved : 25)
                                (You will get reply from our bot when your request is completed)
                                <br/><br/>
<b>@threadRipperBot save video</b> -- To save videos in a tweet (Yo will get reply from our bot with video download links)
        </Typography>
        </Paper>
        </div>
        </div>

);

}

export default Commands;
