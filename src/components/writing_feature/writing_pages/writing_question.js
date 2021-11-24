import { useState, useRef, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { listMoody } from './constant/mood_constant.js';
import { CONST_HASHTAG } from '../../constant/hash_tag.js'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './writing_pages.css';
import '../../posts_content/post_content.css';
import AppNavBar from "../../constant/web_bar.js";
import PostContent from "../../posts_content/post_content.js";
import { MOODY } from "../../constant/moods.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.js";
import { db} from "../../../firebase.js";
import { collection, doc, getDoc, addDoc} from "firebase/firestore";

const lstMoody = [<option>Pick your mood</option>, ...listMoody];


function WritingQuestion(props) {

    
    const location = useLocation();
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const userRef = doc(db, "users", currentUser.uid);
    
    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(userRef);
            setUser(data.data());
        }
        getUser();
    }, [])

    const [content, setContent] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [moody, setMoody] = useState("");
    const [chosingColor, setChosingColor] = useState("#ffffff");
    const hashtagRef = useRef(); 
    async function writeQuestion() {
        const postsRef = collection(db, "questions");
        const current = new Date();
        const docRef = await addDoc(postsRef, {
            content: content,
            userId: currentUser.uid,
            color: chosingColor,
            userName: user.username,
            hashTags: hashTags,
            moody: moody,
            postingTime: current,
            comment: [],
            postingTime: Date.now()
        });
        navigate("/song_surge_search");
    }

    function _setMoody(event) {
        setMoody(event.target.value);
    }

    return (
        <>
            <AppNavBar nameAppBar = "SongSurge"/>
            <div style = {{display: "flex", flexDirection: "row"}}>
                <div className = "writing_part">
                    <div style = {{maxWidth: 700, marginTop: 50, marginLeft: 100}}>
                        {/* Writing form -- Start */}
                        <Form>
                            <Form.Group>
                                <Form.Label className = "form_label">Content</Form.Label>
                                <Form.Control type = "text" as="textarea"
                                    placeholder = "Share your words with us" rows = {12} 
                                    onChange = {(event) => {setContent(event.target.value)}}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className = "form_label">Hashtag</Form.Label>
                                <Autocomplete
                                    multiple
                                    id="tags-filled"
                                    options={CONST_HASHTAG.map((option) => option.title)}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                    }
                                    onChange = {(event, value) => {
                                        setHashTags(value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField 
                                        {...params}
                                        variant="filled"
                                        placeholder="Hashtags"/>
                                    )}
                                />
                            </Form.Group>
                        </Form>
                        {/* Writing form -- End */}
                        <div>
                            <Row className = "categorization">
                                <Col xs = {5} >
                                    <Row className = "color_part"  >
                                        <Form.Control
                                            type = "color"
                                            defaultValue = "#ffffff"
                                            onChange = {(event) => {setChosingColor(event.target.value)}}
                                            className = "color_picker"
                                        ></Form.Control>
                                        <Col style = {{marginLeft: 10}}>
                                            <Row className = "picker_header">Color</Row>
                                            <Row className = "picker_body">Choose color for your post's background</Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs = {5}>
                                    <Form.Select className = "moody_picker" placeholder = "Pick your mood" onChange = {(event) => {_setMoody(event)}}>
                                        {lstMoody}
                                    </Form.Select>
                                </Col>
                            </Row>  
                        </div>    
                        {/* Functionality Buttons */}
                        <div style = {{display: "flex", flexDirection: "row"}}>
                            <Button className = "writing_button" type = "submit" onClick = {writeQuestion}> 
                                Write Post
                            </Button>
                        </div>
                    </div>
                </div>
                <div className = "preview_part"> 
                    <div style = {{width: "fit-content"}}>
                        <div style = {{height: 50}}/>
                        <div style = {{textAlign: "center"}}>Preview Post</div>
                        <div style = {{height: 50}}/>
                        <PostContent
                        backgroundColor = {chosingColor}
                        moodyPart = {MOODY[moody]}
                        hashTags = {hashTags}
                        userName = {user.username}
                        content = {content}
                        isPreview = {true}
                        />
                    </div>
                </div>
            </div>
            <div style = {{height: 100}}/>
        </>
    );
}

export default WritingQuestion;