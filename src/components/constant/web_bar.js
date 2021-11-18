import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import "@fontsource/leckerli-one"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: 20,
    color: '#F47B0A',
    // color: 'white',  
    fontSize: 30,
    fontFamily: "Leckerli One",
  },
  titleItem:{
    color: 'black',
    fontSize: 16,
    padding: 12
  }
}));

export default function AppNavBar(props) {
  const classes = useStyles();
  const {
    nameAppBar,
    isLogin = true,
    isShare = true,
  } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{ background: '	#F8F8F8'}} >
        <Toolbar>
          <div style={{ textDecoration: 'none', flexGrow: 1}}>
            <Typography variant="h6" className={classes.title}>
              {nameAppBar}
            </Typography>
          </div>

          {
            (isLogin && isShare == false) 
            ? <Link to="/song_surge_share" style={{ textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.titleItem}>
                Share
              </Typography>
            </Link>
            :<> </>
          }

          {
            (isLogin && isShare)
            ? <Link to="/song_surge_search" style={{ textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.titleItem}>
                Search
              </Typography>
            </Link>
            : <></>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
