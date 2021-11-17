import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap"
import TextField from '@mui/material/TextField';
import './song_enter_page_style.css';
import AppNavBar from "../../constant/web_bar";

function EnterSongPage() {

    const navigate = useNavigate();
    const [songLink, setSongLink] = useState("");

    function getSongLink() {
        navigate("/writing_post", {state: {songLink: songLink}});
    }

    return(
        <div>
            <AppNavBar nameAppBar = "SongSurge"/>
            <div style = {{textAlign: "center"}}>
                <div style = {{fontSize: 50, textAlign: "center", marginTop: 100, marginBottom: 150}}>Share your song link here</div>
                <div>
                    <TextField
                        style = {{width: 600}}
                        id="outlined-secondary"
                        label="Share your song link here"
                        variant="outlined"
                        color="secondary"
                        placeholder = "Your song link"
                        onChange = {(event) => {
                            setSongLink(event.target.value)
                        }}
                    />
                </div>
                <div style = {{marginTop: 50, marginBottom: 50}}>
                    <Button onClick = {getSongLink}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EnterSongPage;