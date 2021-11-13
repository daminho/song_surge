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
  );
}

export default App;