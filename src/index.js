import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'styles/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from 'app/store';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/common/Loader';

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API || 'https://websiteapi.megafans.io/',
  headers: {
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <App />
            <ToastContainer
              position='top-right'
              autoClose={3000}
              closeOnClick={true}
              pauseOnHover={true}
            />
          </BrowserRouter>
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
