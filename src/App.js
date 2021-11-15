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
import './options.css';
import './options.js';
import GetIn from './getin'
import Option from './options'

<Router>
  <Routes>
    <Route path = "/get_in" element = {<GetIn/>}></Route>
    <Route path = "/option" element = {<Option/>}></Route>
  </Routes>
</Router>

function App() {
  return (
    <div className="App">
      <Option hashTags = {['a','b','c','d','e']}></Option>
    </div>
  );
}

export default App;
