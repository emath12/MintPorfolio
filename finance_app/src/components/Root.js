import './Root.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StockGrid from './user/StockGrid.js';
import Login from './auth/Login.js';
import ProfilePage from './auth/ProfilePage.js';
import Logout from './auth/Logout.js';
import PortfoilioReturns from './user/PortfolioReturns.js';
import Home from './user/Home.js';
import CreateAccount from "./auth/CreateAccount.js"

function Root() {
    return (
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/returns' element={<PortfoilioReturns />} />
            <Route path='/select' element={<StockGrid />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/create-account' element={<CreateAccount />}/>
          </Routes>
      </Router>
    );
}

export default Root;
