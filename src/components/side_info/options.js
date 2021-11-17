import './options.css';
import { React, useState, useEffecft } from "react";
import { Button } from "react-bootstrap"; 
import { HashTag } from '../constant/hash_tag_ui';
import { Moody } from '../constant/moody_ui';
import { MOODY } from '../constant/moods'
import { useNavigate } from 'react-router';

function Option(props) {
    const {
        hashTags = [],
        moods = ["HappySunny", "Blue",  "Cucumber", "FireRock"]
    } = props
    const navigate = useNavigate();
    function writePost() {
        navigate("/enter_song");
    }
    
    return (
        <div class = "options">
            <div style = {{width: 400, position: "fixed"}}>
                <Button className = "write_button" onClick = {(event) => {writePost()}}>Write a Post</Button>
                <div class = "trendingbox">
                    <div class ="trendingtoday">{'Trending today'}</div>
                    <div style = {{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                        {hashTags.map((item) => {return <HashTag className = "hash_tag" hashtag = {item}/>})}
                    </div>
                </div>
                <div class = "moodybox">
                    <div class = "moodytxt">{'Moody'}</div>
                    <div>
                        {moods.map((item) => {return <Moody moodyPart = {MOODY[item]}/>})}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}



export default Option