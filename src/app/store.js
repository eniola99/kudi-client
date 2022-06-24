import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNews } from '../services/cryptoNews';
import userReducer from '../REDUX/userSlice'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNews.reducerPath]: cryptoNews.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat( [cryptoApi.middleware, cryptoNews.middleware] )

});
