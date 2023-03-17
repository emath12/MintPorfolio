import './Root.css';
import {useNavigate} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import StockGrid from './StockGrid.js';
import Login from './Login.js';
import Profile from './Profile.js';
import Logout from './Logout.js';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/select' element={<StockGrid />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default Root;
