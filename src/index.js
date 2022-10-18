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

// import PubNub, { generateUUID } from "pubnub"
// import {PubNubProvider} from "pubnub-react"

// const pubnub = new PubNub({
//   publishKey: "pub-c-dfdb0a08-9c55-4eef-87b6-e0646f8fad7a",
//   subscribeKey: "sub-c-437a17ff-2298-45ba-a5bd-90732ad0c726",
//   uuid: generateUUID(),
// })

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API || 'https://websiteapi.megafans.io/',
  headers: {
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          {/* <PubNubProvider client={pubnub}> */}
            <BrowserRouter>
              <App />
              <ToastContainer
                position='top-right'
                autoClose={3000}
                closeOnClick={true}
                pauseOnHover={true}
              />
            </BrowserRouter>
          {/* </PubNubProvider> */}
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
