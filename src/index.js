import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import {store, persistor} from '../src/app/store'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
