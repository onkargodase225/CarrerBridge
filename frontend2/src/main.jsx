import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Toaster} from './components/ui/sonner.jsx'
import {Provider} from 'react-redux';
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react';
import store from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor=persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App /> 
        <Toaster/> 
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
