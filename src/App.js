import './App.css';
import PostContent from './components/posts_content/post_content.js';

function App() {
  return (
    <div className="App">
      <PostContent
        userId="IamPostContent"
        postingTime={Date.now()}
        content={`I just feel in love with a girl who I think was born for me, and I also find this song. It's quite what I'm thinking about her. She is perfect, she is who I want to marry and get old together.`}
        link="https://www.youtube.com/embed/GBUAez6w5ec"
        moodyPart={{
          symbol: '🌞',
          string: 'Feeling happy like sunny day'
        }}
        hashTags={['#love', '#perfect', '#happy']}
      ></PostContent>
    </div>
  );
}

export default App;
