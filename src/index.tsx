import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MobileBGS from './StyleComp/MobileBGS';
import App from './App';
import GlobalStyle from './StyleComp/GlobalStyle';
import reportWebVitals from './reportWebVitals';
// import axios from "axios";
import ReactGA from 'react-ga4';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <MobileBGS> */}
      <GlobalStyle />
      <App />
      {/* </MobileBGS> */}
    </BrowserRouter>    ,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
