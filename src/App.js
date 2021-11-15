import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch
} from "react-router-dom";
import './App.css';
import SignUp from './components/writing_feature/sign_up';
import EnterSongPage from './components/writing_feature/song_enter_page/song_enter_page';
import WritingQuestion from './components/writing_feature/writing_pages/writing_question';
import PostContent from './components/posts_content/post_content';
import SignIn from './components/writing_feature/log_in';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path = "/" element = {<WritingQuestion/>}> </Route>
          <Route path = '/post_content_preview' element = {<PostContent/>}></Route>
          <Route path = "/sign_up" element = {<SignUp/>}></Route>
          <Route path = "/sing_in" element = {<SignIn/>}></Route>
          <Route path = "/enter_song" element = {<EnterSongPage/>}></Route>
          <Route path = "/writing_question" elemet = {<WritingQuestion/>}></Route> 
        </Routes>
      </AuthProvider>
    </Router>
    

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

  );
}

export default App;