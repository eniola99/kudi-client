import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../src/app/store'
import { AuthContextProvider } from './context/authContext/AuthContext'
import { TransactionsProvider } from './SmartContractContext/TransactionContext'

import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <TransactionsProvider>
    <Router>
        <AuthContextProvider>
        <Provider store={store}>
          <App />
          </Provider>
        </AuthContextProvider>
    </Router>
    </TransactionsProvider>,
  document.getElementById('root')
);

reportWebVitals();
