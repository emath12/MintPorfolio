import './Root.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StockGrid from './user/StockGrid.js';
import Login from './auth/Login.js';
import ProfilePage from './auth/ProfilePage.js';
import Logout from './auth/Logout.js';
import PortfoilioReturns from './user/PortfolioReturns.js';
import Home from './user/Home.js';
import CreateAccount from "./auth/CreateAccount.js"
import useToken from "./auth/useToken";


function Root() {
    const { token, removeToken, setToken } = useToken();

    return (
      <Router>
          <Routes>
            <Route path='/' element={<Home token={token}/>} />
            <Route path='/returns' element={<PortfoilioReturns token={token} />} />
            <Route path='/select' element={<StockGrid token={token}/>} />
            <Route path='/profile' element={<ProfilePage token={token} setToken={setToken}/>} />
            <Route path='/login' element={<Login setToken={setToken}/>} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/create-account' element={<CreateAccount />}/>
          </Routes>
      </Router>
    );
}

export default Root;
