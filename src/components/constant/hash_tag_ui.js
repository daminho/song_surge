import React from "react";
import "../posts_content/post_content.css"

export function HashTag(props) {
    const {
        hashtag,
        onClick,
    } = props;
    return(
        <button onClick = {(event) => {onClick(hashtag)}} className="hash_tag" key={hashtag}>{"#" + hashtag}</button>
    );
}