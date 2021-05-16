import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginBottom: 5,
  },
  paper: {
    padding: 20,
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
        <TextField className={classes.field}
          value={tweet.text}
          variant="outlined" 
          color="secondary" 
          fullWidth
          multiline
        />
      </Paper>
    </div>
  );
}

export default Tweet
