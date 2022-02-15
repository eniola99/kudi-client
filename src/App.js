import { Routes, Route, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import Navbar from './components/Navbar';
import Crypto from './components/Crypto';
import News from './components/News';
import './App.css';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Trade from './components/Trade';
import CryptoDetails from './components/CryptoDetails';
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from 'react'



function App() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <>
    <div className="app">
      <div className='navbar'>
        < Navbar />
      </div>
      <div className='main'>
      <Layout>
        
        <div className='routes'>
          < Routes>
            < Route exact path="/" element={< Homepage />}></Route>
            < Route exact path="/crypto" element={< Crypto />}></Route>
            < Route exact path="crypto/:coinId" element={< CryptoDetails />}></Route>
            < Route exact path="/news" element={< News />}></Route>
            < Route  exact path="/login"  element={< Login />}> </Route>
            < Route exact path="/signup" element={< Signup />} ></Route>
            < Route exact path="/trade" element={< Trade />}></Route>
          </ Routes>
        </div>
      </Layout>  
      <div className='footer'>
       < Footer/>
      </div>
      </div>
    </div>
    </>
  );
}

export default App;
