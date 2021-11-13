import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';

function WritingQuestion(props) {

    const [songLink, setSongLink] = useState("");
    const [content, setContent] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [moodyPart, setMoodyPart] = useState();
    const [backgroundColor, setBackgroundColor] = useState();


    return (
        <div style = {{maxWidth: 700}}>
            <Form>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type = "text" as="textarea" placeholder = "Share your words with us" rows = {12}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hashtag</Form.Label>
                    <Form.Control type = "text"></Form.Control>
                </Form.Group>
             </Form>
        </div>
    );
}

export default WritingQuestion;