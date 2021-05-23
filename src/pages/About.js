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
links:{
    textDecoration: 'none',
    color: ' #1da1f2',
},
});

function About(){

    const classes = useStyles();

return (

    <div className={classes.root}>
<Typography className= {classes.title}> ABOUT </Typography>
<Divider/>
      <div className={classes.transparent}>
        
      <Paper className={classes.paper}>
    
      <Typography  className={classes.text}>
     <center><b>ThreadRipperBotnet</b></center>
    <br/>   
ThreadRipperBotnet is a collection of twitter bots working together to rip Twitter threads and save
them {/*in https://twitterthreadripper.ga */} for users.
<br/><br/>
Users can view/delete saved twitter threads/videos in their dashboard. Saved Threads will remain in
their dashboard even if the original tweet gets deleted from Twitter. Users can export saved threads
as pdfs or download videos/images from saved threads.
<br/><br/>
This project is completely open source and does not collects any information from users.
<br/><br/>
Bot source code:<br/> <a className={classes.links} href = "https://github.com/superRaptor911/TwitterThreadRipper"> <b>CLICK HERE.</b></a> 
<br/><br/>
Site and Server source code: <br/><a className={classes.links} href = "https://github.com/superRaptor911/super-raptor-bot-website"><b>CLICK HERE.</b></a>
<br/><br/>
This project was created for Build From Home 2021 by team : BFH/recJlC5PthruZaYYj/2021
        </Typography>
        </Paper>
        </div>
        </div>

);

}

export default About;
