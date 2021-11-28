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
        hashtag,
        mood,
        userName, 
        changeMoody,
        changeHashtag,
        changeUserName,
    } = props
    const navigate = useNavigate();
    const hasFilter = (hashtag != undefined || mood != undefined || userName != undefined);

    function clearFilter() {
        changeMoody();
        changeHashtag();
        changeUserName();
    }
    
    return (
        <div class = "options">
            <div style = {{ position: "sticky", marginLeft: 20}}>
                <div class = "filterbox">
                    <Row style = {{marginBottom: 20, height: 25}}>
                        <Col xs = {8}><div class = "moodytxt">{'Filter'}</div></Col>
                        {hasFilter ? <Col><button className = "clear_filter" onClick = {(event) => {clearFilter()}}>Clear</button></Col> : <div/>}
                    </Row>
                    {userName != undefined
                        ? <div>
                            <div class = "moodytxt" style = {{ marginTop: 10}}>{'Writer'}</div>
                            <div style = {{fontSize: 16}}>{userName}</div>
                        </div>
                        : <div/>}
                    {mood != undefined
                        ? <div>
                            <div class = "moodytxt" style = {{ marginTop: 10}}>{'Moody'}</div>
                            <Moody moodyPart = {MOODY[mood]}/>
                        </div>
                        : <div/>}
                    {hashtag != undefined 
                        ? <div>
                            <div class = "moodytxt" style = {{ marginTop: 10}}>{'Hashtag'}</div>
                            <HashTag className = "hash_tag" hashtag = {hashtag}/>
                        </div>
                        : <div/>}
                    {hasFilter ? <div/> : <div>There is no filter yet</div>}
                </div>
            </div>
        </div>
    )
}



export default Filter