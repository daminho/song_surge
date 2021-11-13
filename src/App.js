import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch
} from "react-router-dom";
import './App.css';
import SignInSignUp from './components/writing_feature/sign_in_sign_up';
import EnterSongPage from './components/writing_feature/song_enter_page/song_enter_page';
import WritingQuestion from './components/writing_feature/writing_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<SignInSignUp/>}> </Route>
        <Route path = "/login" element = {<SignInSignUp/>}></Route>
        <Route path = "/enter_song" element = {<EnterSongPage/>}></Route>
        <Route path = "/writing_question" elemet = {<WritingQuestion/>}></Route> 
      </Routes>
    </Router>
// =======
// import './App.css';
// import PostContent from './components/posts_content/post_content.js';

// function App() {
//   return (
//     <div className="App">
//       <PostContent
//         userId="IamPostContent"
//         postingTime={Date.now()}
//         content={`I just feel in love with a girl who I think was born for me, and I also find this song. It's quite what I'm thinking about her. She is perfect, she is who I want to marry and get old together.`}
//         link="https://www.youtube.com/embed/GBUAez6w5ec"
//         moodyPart={{
//           symbol: '🌞',
//           string: 'Feeling happy like sunny day'
//         }}
//         hashTags={['#love', '#perfect', '#happy']}
//       ></PostContent>
//     </div>
// >>>>>>> main
  );
}

export default App;