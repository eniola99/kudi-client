import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../src/app/store'
import { TransactionsProvider } from './SmartContractContext/TransactionContext'

import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <TransactionsProvider>
    <Router>
        <Provider store={store}>
          <App />
          </Provider>
    </Router>
    </TransactionsProvider>,
  document.getElementById('root')
);

reportWebVitals();
