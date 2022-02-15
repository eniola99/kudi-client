import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../src/app/store'
import { AuthContextProvider } from './context/authContext/AuthContext'

import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
    <Router>
        <AuthContextProvider>
        <Provider store={store}>
          <App />
          </Provider>
        </AuthContextProvider>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
