import React from "react";
import "../posts_content/post_content.css"

export function HashTag(props) {
    const {
        hashtag
    } = props;
    return(
        <div className="hash_tag" key={hashtag}>{"#" + hashtag}</div>
    );
}