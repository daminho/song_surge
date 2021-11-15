import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link, 
  Routes, 
  Switch
} from "react-router-dom";
import './getin.css';
import './getin.js';
import GetIn from './getin'


<Router>
  <Routes>
    <Route path = "/get_in" element = {<GetIn/>}></Route>
  </Routes>
</Router>

function App() {
  return (
    <div className="App">
      <GetIn></GetIn>
    </div>
  );
}

export default App;
