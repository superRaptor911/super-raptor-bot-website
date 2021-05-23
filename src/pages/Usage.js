import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Divider, makeStyles } from '@material-ui/core';
import t1 from '../components/images/steps/t1.png';
import t2 from '../components/images/steps/t2.png';
import t3 from '../components/images/steps/t3.png';
import t4 from '../components/images/steps/t4.png';



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
imgGuide : {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
},
links:{
    textDecoration: 'none',
    color: ' #1da1f2',
    fontWeight: 'bold',
},
});

function Usage(){

    const classes = useStyles();

return (

    <div className={classes.root}>

<Typography className= {classes.title}> HOW TO USE </Typography>
<Divider/>
      <div className={classes.transparent}>
        
      <Paper className={classes.paper}>
    
      <Typography  className={classes.text}>
      step 1) Goto <a  className = {classes.links} href = "https://twitter.com/">twitter.com</a>
        </Typography>

        <img
        className = {classes.imgGuide} 
        src = {t1}
        alt ='image'/>
 
        <Typography className = {classes.text}>
        step2) reply a tweet u want to save using <a className = {classes.links} href = "./commands">COMMANDS</a>.
        </Typography>

        <img
        className = {classes.imgGuide} 
        src = {t2}
        alt ='image'/>

    <Typography className = {classes.text}>
    step 3.) wait for 1-2 minutes , you will get reply from bot
        </Typography>

        <img
        className = {classes.imgGuide} 
        src = {t3}
        alt ='image'/>

    <Typography className = {classes.text}>
    step 4.) Login to threadripper.ga
        </Typography>

    <img
        className = {classes.imgGuide} 
        src = {t4}
        alt ='image'/>

    <Typography className = {classes.text}>
    step5.) View your saved threads 
        </Typography>
        

        </Paper>
        </div>
        </div>

);

}

export default Usage;
