import './App.css';
import { EmojiButton } from '@joeattardi/emoji-button';
import Postcomment from './comment';

function App() {
  return (
    <div className="App">
      <div className='comment-container'>
        <div className="textarea-container">
          <textarea type="text" className="input" placeholder="Show your support to the post!" v-model="newItem" onKeyPress="if(event.keyCode==13) {addItem();}" defaultValue={""}></textarea>
          <custombutton id = "emoji-button">😀</custombutton>
          <input id = 'button' type = 'file' value = '' hidden></input>
          <custombutton>🖼️</custombutton>
          <custombutton>🎵</custombutton>
          <custombutton>🎞️</custombutton>
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
  const custombutton =  document.querySelector('button')
  custombutton.addEventListener('click', ()=>{
    button.click()
  });
});

export default App;
