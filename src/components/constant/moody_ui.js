import React from "react";
import "../posts_content/post_content.css"

export function Moody(props) {
    const {
        moodyPart
    } = props;
    return(
        <button className="moody_part" style = {{backgroundColor: moodyPart == null ? "transparent" : moodyPart.moodColor}}>
            <div className="symbol">{moodyPart?.moodSymbol}</div>
            <div className="string">{moodyPart?.moodContent}</div>
        </button>
    );
}