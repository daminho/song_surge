import { useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { SketchPicker, SwatchesPicker, PhotoshopPicker } from 'react-color';
import { ReactTags } from 'react-tag-autocomplete';

import Dialog from '@mui/material/Dialog/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {CONST_HASHTAG} from '../../constant/hash_tag.js';

// function singleHashTag() {

// }

function WritingQuestion(props) {

    const reactTag = createRef();
    const [songLink, setSongLink] = useState("");
    const [content, setContent] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [moodyPart, setMoodyPart] = useState();
    const [chosingColor, setChosingColor] = useState();
    const [backgroundColor, setBackgroundColor] = useState();
    const [isShowColorPicker, setColorPicker] = useState(false);

    function writeQuestion() {
        console.log("submit");
    }

    function updateColor(hexColor) {
        setChosingColor(hexColor);
    }

    function choseBackgroundColor() {
        setColorPicker(false);
        setBackgroundColor(chosingColor);
    }

    function changeColorPickerState() {
        setColorPicker(!isShowColorPicker);
    }

    return (
        <div style = {{maxWidth: 700}}>
            {/* Writing form -- Start */}
            <Form>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type = "text" as="textarea" placeholder = "Share your words with us" rows = {12}></Form.Control>
                </Form.Group>
            </Form>
            {/* <ReactTags
                ref = {reactTag}
                tags = {hashTags}
                suggestions = {CONST_HASHTAG}
            >
            
            </ReactTags> */}
            {/* Writing form -- End */}

            {/* Functionality Buttons */}
            <Button type = "button" onClick = {changeColorPickerState}>
                Pick Color
            </Button>
            <Dialog
                open = {isShowColorPicker}
            >
                <DialogTitle>
                    Choose Background Color
                </DialogTitle>
                <DialogContent>
                    <SketchPicker 
                        onChange = {(event) => {
                            updateColor(event.hex);
                        }}
                        color = {chosingColor}
                    />
                </DialogContent>
                <DialogAction>
                    <Button onClick = {changeColorPickerState}>Cancel</Button>
                    <Button onClick = {choseBackgroundColor}>OK</Button>
                </DialogAction>
            </Dialog>
            <Button type = "submit" onClick = {writeQuestion}> 
                Write Post
            </Button>
        </div>
    );
}

export default WritingQuestion;