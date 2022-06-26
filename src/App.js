import { Routes, Route, Navigate } from 'react-router-dom'
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
import Success from './components/Success'
import Settings from './components/Settings'
import CryptoDetails from './components/CryptoDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verified from './components/Verified';
import { useSelector, useDispatch,} from "react-redux";
import { LogoutCall } from '../src/REDUX/userSlice'
import { useEffect } from 'react';


function App() {
  const user = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(LogoutCall())
  }

  // useEffect(() => {
  //   const token = user?.generateToken;

  //   //jwt check if expire token
  //   if(token) {
  //     const decodedToken = decode(token)

  //     if(decodedToken.exp*1000 < newDate().getTime())
  //     logout()
  //   }
  // })

return (
    <>
    <div className="app">
      <div className='navbar'>
        < Navbar />
      </div>
      <div className='main'>
      <Layout>
        <div className='routes'>
        <ToastContainer />        
          < Routes>
            < Route exact path="/" element={< Homepage />}></Route>
            < Route exact path="/crypto" element={< Crypto />}></Route>
            < Route exact path="crypto/:coinId" element={< CryptoDetails />}></Route>
            < Route exact path="/news" element={< News />}></Route>
            
            < Route  exact path="/login"  element={user ? <Navigate replace to="/trade" /> : < Login />}> </Route>
            < Route exact path="/signup" element={ < Signup />} > </Route>
            
            < Route exact path="/trade" element={user ? < Trade /> : <Homepage />}></Route>
            < Route exact path="/success" element={< Success />}></Route>
            < Route exact path="/settings" element={user ? < Settings /> : <Homepage />}></Route>
            < Route exact path="/verified" element={< Verified />}></Route>
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