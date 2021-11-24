import './options.css';
import { React, useEffect, useState} from "react";
import { Button } from "react-bootstrap"; 
import { HashTag } from '../constant/hash_tag_ui';
import { Moody } from '../constant/moody_ui';
import { MOODY } from '../constant/moods'
import { useNavigate } from 'react-router';

function Option(props) {
    const {
        search = false,
        hashTags = [],
        onClickMoody,
        onClickHashtag,
    } = props
    const navigate = useNavigate();
    function writePost() {
        search ? navigate("/writing_question") : navigate("/enter_song");
    }
    
    const [moodUI, setMoodUI] = useState();
    useEffect(() => {
        const getMoodUI = () => {
            var randomId = [...Array(8).keys()].map((val) => {return val%2});
            randomId.sort(() => {return Math.random() - 0.5})
            const tmpMoodUI = Object.entries(MOODY).map(([key, value], index) => {return randomId[index] == 1 ? <Moody moodyPart = {value} onClick = {(event) => {onClickMoody(key)}}/> : <div/>});
            setMoodUI(tmpMoodUI);
        }
        getMoodUI() 
    },[]);

    return (
        <div class = "options">
            <div className = "option_style">
                <div>
                    <Button className = "write_button" onClick = {(event) => {writePost()}}>{search ? "Write a Question" : "Write a Post"}</Button>
                    <div class = "trendingbox">
                        <div class ="trendingtoday">{'Trending today'}</div>
                        <div style = {{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                            {hashTags.map((item) => {return <HashTag className = "hash_tag" hashtag = {item} onClick = {(event) => {onClickHashtag(item)}}/>})}
                        </div>
                    </div>
                    <div class = "moodybox">
                        <div class = "moodytxt">{'Moody'}</div>
                        <div>
                            {moodUI}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Option