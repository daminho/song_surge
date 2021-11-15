import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { SketchPicker, SwatchesPicker, PhotoshopPicker } from 'react-color';
import { ReactTags } from 'react-tag-autocomplete';

import Dialog from '@mui/material/Dialog/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoodyPart from "../../posts_content/moody.js";

import {CONST_HASHTAG} from '../../constant/hash_tag.js';
import './writing_pages.css';
import '../../posts_content/post_content.css';
// function singleHashTag() {

// }

function getHashtag() {

}

function WritingQuestion(props) {

    const [songLink, setSongLink] = useState("");
    const [content, setContent] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [moodyPart, setMoodyPart] = useState({
        symbol: '🌞',
        string: 'Feeling happy like sunny day'
      });
    const [chosingColor, setChosingColor] = useState();
    const [backgroundColor, setBackgroundColor] = useState();
    const [isShowColorPicker, setColorPicker] = useState(false);

    function writeQuestion() {
        console.log("submit");
    }

    function updateColor(hexColor) {
        setChosingColor(hexColor);
    }

    function _addHashTag(hashTag) {

    }
    
    function _deleteHashTag(hashTag) {
        
    }

    function suggestHashtag(curHashtag){
        console.log(curHashtag);
    }

    console.log(moodyPart.symbol);
    return (
        <div style = {{maxWidth: 700}}>
            {/* Writing form -- Start */}
            <Form>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type = "text" as="textarea" placeholder = "Share your words with us" rows = {12}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hashtag</Form.Label>
                    <Form.Control type = "text" placeholder = "Hashtag" onChange = {(event) => {suggestHashtag(event.target.value)}} ></Form.Control>
                </Form.Group>
            </Form>
            {/* Writing form -- End */}
                {/* style = {{width: 450,  flexWrap: "nowrap", backgroundColor: "blue"}} */}

            <Container >
                <Row className = "categorization">
                    <Col className = "color_part">
                        <Row>
                            <Form.Control
                                type = "color"
                                defaultValue = "#ffffff"
                                onChange = {(event) => {setColorPicker(event.target.value)}}
                                className = "color_picker"
                            ></Form.Control>
                            <Col style = {{marginLeft: 10}}>
                                <Row className = "picker_header">Color</Row>
                                <Row className = "picker_body">Choose color for your post's background</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className = "moody_picker" >
                        <Form.Select className = "moody_picker" placeholder = "Pick your mood">
                            <option>
                                🥒 Feeling like cucumber
                            </option>
                        </Form.Select>
                    </Col>
                </Row>  
            </Container>
            {/* Functionality Buttons */}
            
            <Button type = "submit" onClick = {writeQuestion}> 
                Write Post
            </Button>
        </div>
    );
}

export default WritingQuestion;