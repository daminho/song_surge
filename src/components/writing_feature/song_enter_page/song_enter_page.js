import { useState } from "react";
import { useNavigate } from "react-router";

function EnterSongPage() {

    const navigate = useNavigate();
    const [songLink, setSongLink] = useState("");

    function getSongLink() {
        // const history = useHistory();
        // history.push("/writing_question");
        var data = {
            link: songLink,
            text: "abcded"
        }
        navigate("writing_question", {state: data});
    }

    return(
        <>
        <div>
            <input
            placeholder = "Song link"
            onChange = {(event) => {
                setSongLink(event.target.value)
            }}
            />
        </div>
        <div>
            <button onClick = {getSongLink}>
                Continue
            </button>
        </div>
        </>
    );
}

export default EnterSongPage;