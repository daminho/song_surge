import './App.css';
import { EmojiButton } from '@joeattardi/emoji-button';
import Postcomment from './comment';
import React from 'react';
import Img from "./img";
import Link from "./link";
import GifB from "./gif";

function App() {
  return (
    <div className="App">
      <div className='comment-container'>
        <div className="textarea-container">
          <input type="text" placeholder="Show your support to the post!"></input>
          <custombutton id = "emoji-button">😀</custombutton>
          <Link></Link>
          <GifB></GifB>
          <Img></Img>
        </div>{/*end comment container*/}
        <div className="comment">
          <Postcomment
            userId="Happy Kid"
            postingTime={Date.now()}
            content={`Wow, wonderful stories. I'm also in a relationship now and, yes, I feel my girlfriend is a perfect girl. Want to share this postive vibes to people. Yayyyyyy.`}
            link=""
            hashTags={[]}
          >
          </Postcomment>
          <Postcomment
            userId="Sad Kid"
            postingTime={Date.now()}
            content={`No, Don't fall in love guys. I just went through a bad relationship. I'm gonna go lowkey now ==))`}
            link=""
            hashTags={[]}
          >
          </Postcomment>
        </div>{/*End Comment*/}
      </div>
    </div>
  );
}
window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#emoji-button');
  const picker = new EmojiButton();

  picker.on('emoji', emoji => {
    document.querySelector('input').value += emoji;
  });

  button.addEventListener('click', () => {
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  });
});

export default App;
