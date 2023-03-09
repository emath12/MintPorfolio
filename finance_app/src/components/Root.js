import './Root.css';
import {useNavigate} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import Graph from './Graph.js';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Root;
