import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {getDoc, doc, collection, getDocs, updateDoc} from '@firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
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



function NotiUI(props) {
  const {
    docData,
    docId,
    userId, 
  } = props;

  const navigate = useNavigate();
  const clickOneNoti = async (postId, isQuestion) => {
    const notiRef = doc(db, "users/" + userId + "/notifications/" + docId);
    await updateDoc(notiRef, {
      read: true,
    });
    navigate(`/view/${postId}`, { state: {postId: postId, isQuestion: isQuestion}});
  };

  return (
    <MenuItem
        key={docId}
        onClick={() => {clickOneNoti(docData.postId, docData.isQuestion)}}
        selected = {docData.read == false}
        style={{whiteSpace: 'normal', margin:5}}
      >
        <Typography style = {{wordWrap: 'break-word'}}>
          <div>
            <span style = {{fontWeight: "bold"}}>{docData.authorName}</span> {docData.type}
          </div>
        </Typography>
      </MenuItem>
  );
}





export default function AppNavBar(props) {
  const classes = useStyles();
  const {
    nameAppBar,
    isLogin = true,
    isShare = true,
    isGeneral = true,
  } = props;
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [options, setOptions] = useState([]);

  const handleNotiClick = async (event) => {
    const userNotiRef = collection(db, "users", currentUser.uid, "notifications");
    const noti = await getDocs(userNotiRef);
    const sortedNoti = noti.docs.map((doc) => {return [doc.id, doc.data()];});
    sortedNoti.sort((a,b) => {
      if(a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    })
    console.log(sortedNoti);
    const notis = sortedNoti.map((doc) => {
      const docData = doc[1];
      console.log(doc[0]);
      return <div onClick = {() => {setAnchorEl(false);}}>
        <NotiUI docData = {docData} docId = {doc[0]} userId = {currentUser.uid}/>
      </div>;
    });
    const finalNoti = notis.length != 0 
      ? notis
      : [
        <MenuItem>
          <Typography style = {{wordWrap: 'break-word', fontWeight: "bold"}}>
            <div>There is no notification yet.</div>
          </Typography>
        </MenuItem>
      ]
    setOptions(finalNoti);
  };



  const handleNotiClose = () => {
    setAnchorEl(null);
  };
  

  useEffect(() => {
      const getUser = async () => {
        if(isLogin == false) return;
        const userRef = doc(db, "users", currentUser.uid);
        const data = await getDoc(userRef);
        setUser(data.data());
      }
      getUser();
  }, [options])


  return (
    <div className={classes.root}>
      <AppBar position="fixed"  style={{ background: '	#F8F8F8'}} >
        <Toolbar>
          <div style={{ textDecoration: 'none', flexGrow: 1}}>
            <Typography variant="h6" className={classes.title}>
              {nameAppBar}
            </Typography>
          </div>

          {
            (isGeneral || (isLogin && isShare == false)) 
            ? <Link to="/song_surge_share" style={{ textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.titleItem}>
                Share
              </Typography>
            </Link>
            :<> </>
          }

          {
            (isGeneral || (isLogin && isShare))
            ? <Link to="/song_surge_search" style={{ textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.titleItem}>
                Search
              </Typography>
            </Link>
            : <></>
          }
          {
            isLogin 
            ? <div>
                <IconButton
                  onClick = {(event) => {
                    handleNotiClick(event);
                    setAnchorEl(event.currentTarget);
                  }}
                >
                  <NotificationsIcon/>
                </IconButton>
                <Menu
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleNotiClose}
                  PaperProps={{
                    style: {
                      maxHeight: 300,
                      width: "30ch"
                    }
                  }}
                >
                  {options}
                </Menu>
              </div>
            : <></>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
