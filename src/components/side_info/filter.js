import './filter.css';
import { React, useState, useEffecft } from "react";
import { Button, Row, Col } from "react-bootstrap"; 
import { HashTag } from '../constant/hash_tag_ui';
import { Moody } from '../constant/moody_ui';
import { MOODY } from '../constant/moods'
import { useNavigate } from 'react-router';

function Filter(props) {
    const {
        search = false,
        hashtag = "",
        mood = "HappySunny",
        closeFunction = () => {},
    } = props
    const navigate = useNavigate();
    function writePost() {
        search ? navigate("/writing_question") : navigate("/enter_song");
    }
    
    return (
        <div class = "options">
            <div style = {{ position: "fixed", marginLeft: 20}}>
                <div class = "filterbox">
                    <Row style = {{marginBottom: 20}}>
                        <Col xs = {10}><div class = "moodytxt">{'Filter'}</div></Col>
                        <Col><button>X</button></Col>
                    </Row>
                    <Moody moodyPart = {MOODY[mood]}/>
                    <HashTag className = "hash_tag" hashtag = {hashtag}/>
                </div>
            </div>
        </div>
    )
}



export default Filter