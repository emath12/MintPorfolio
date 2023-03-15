import './Root.css';
import {useNavigate} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import Graph from './Graph.js';
import StockGrid from './StockGrid.js';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/daphne' element={<StockGrid />} />
      </Routes>
    </Router>
  );
}

export default Root;
