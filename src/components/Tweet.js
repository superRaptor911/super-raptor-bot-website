import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginBottom: 10,
    minWidth: 300,
    // flexGrow: 1,
    width: '100%',
    maxWidth: 1000,
    '@media screen and (max-width: 1000px)':{
      
    },
  '@media screen and (max-width: 420px)':{
    minWidth: 250,
    width: '100%',
    maxWidth: 380,
    
    },
  },
  paper: {
    padding: 20,
    overflow: 'auto',
    boxShadow: 'none',
    borderRadius: 30
  },
  title : {
    textAlign: 'center',
  },
  login: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatarContainer: {
    display: "flex",
  },
  tweetName: {
    marginLeft: 5,
  },
  tweetText: {
    fontSize: 20,
  },
  tweetMediaContainer: {
    marginTop: 20,
  },
  tweetMedia: {
    borderRadius: 10,
    objectFit: 'contain',
    width: '100%',
  }
});

const Tweet = ({tweet}) => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            alt={tweet.userName}
            src={tweet.image_https}
          />
          <Typography className={classes.tweetName}>
            {tweet.username}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography className={classes.tweetText}>
            {tweet.text}
          </Typography>

          
          {tweet.images.map((image, id) => (
            <div className={classes.tweetMediaContainer} key={id}>
              <a href={image}>
                <img alt={"media"} src={image} className={classes.tweetMedia}/>
              </a>
            </div>
          )) }

          {tweet.videos.map((video, id) => (
            <div className={classes.tweetMediaContainer} key={id}>
              <a href={video[0].link}>{"Video" + id}</a>
            </div>
          )) }

        </div>
      </Paper>
    </div>
  );
}

export default Tweet
