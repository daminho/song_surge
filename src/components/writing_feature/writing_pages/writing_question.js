import { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { listMoody} from './constant/mood_constant.js';
// import CustomHashTag from "./constant/hash_tag_constant.js";
import './writing_pages.css';
import '../../posts_content/post_content.css';

var listHashtag = [];


function CustomHashTag(props) {
    const {
        content,
        index,
        hashtagClick
    } = props;
    return (
        <Row className = "hash_tag" xs = {2}>
            <Col className = "content">
                {content}
            </Col>
            <Col className = "button">
                <Button onClick = {() => {hashtagClick()}}>X</Button>
            </Col>
        </Row>
    );
}




function WritingQuestion(props) {

    const [songLink, setSongLink] = useState("");
    const [content, setContent] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [currentHashTag, setCurrentHashTag] = useState("");
    const [currentHashTagList, setCurrentHashTagList] = useState(listHashtag);
    const [moody, setMoody] = useState("");
    const [chosingColor, setChosingColor] = useState();
    
    const hashtagRef = useRef();

    function writeQuestion() {
        console.log("submit");
    }

    function renderHashTag(tmpListHashTag) {
        return tmpListHashTag.map((item, index) => {
            return <Col xs = {2}>
                <CustomHashTag
                    key = {index}
                    content = {item}
                    index = {index}
                    hashtagClick = {(event) => {console.log("click"); deleteHashTag(index)}}
                ></CustomHashTag>
            </Col>
        });
    }

    function deleteHashTag(index) {
        console.log(index);
        var newHashTags = hashTags;
        newHashTags.splice(index, 1);
        listHashtag = renderHashTag(newHashTags);
        setCurrentHashTagList(listHashtag);
        setHashTags(newHashTags);
    }

    function addHashTag(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            const newHashTags = hashTags;
            var ok = true;
            for (var i = 0; i < newHashTags.length; i++) {
                if(newHashTags[i] == currentHashTag) {
                    ok = false
                }
            }
            if(ok == true) {
                newHashTags.push(currentHashTag);
            }
            hashtagRef.current.value = "";
            console.log(newHashTags);
            listHashtag = renderHashTag(newHashTags);
            setCurrentHashTagList(listHashtag);
            console.log(listHashtag);
            // console.log(newHashTags);
            setCurrentHashTag("");
            setHashTags(newHashTags);
        }
    }
    
    function _setMoody(event) {
        setMoody(event.target.value);
    }

    return (
        <div style = {{maxWidth: 700}}>
            {/* Writing form -- Start */}
            <Form>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type = "text" as="textarea"
                         placeholder = "Share your words with us" rows = {12} 
                         onChange = {(event) => {setContent(event.target.value)}}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hashtag</Form.Label>
                    <Container>
                        <Row>
                            {currentHashTagList}
                        </Row>
                    </Container>
                    <Form.Control
                        type = "text" placeholder = "Hashtag"
                        onKeyDown = {(event) => {addHashTag(event)}}
                        onChange = {(event) => {setCurrentHashTag(event.target.value);}}
                        ref = {hashtagRef}
                    ></Form.Control>
                </Form.Group>
            </Form>
            {/* Writing form -- End */}

            <Container >
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
                            {listMoody}
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