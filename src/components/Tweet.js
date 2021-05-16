import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    margin: 'auto',
    width: '90%',
    maxWidth: 1000
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
});

const Tweet = (tweet) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar
          className={classes.avatar}
          alt={tweet.userName}
          src={tweet.image_https}
        />
        <TextField className={classes.field}
          value={tweet.text}
          variant="outlined" 
          color="secondary" 
          fullWidth
          disabled
        />
      </Paper>
    </div>
  );
}

export default Tweet
