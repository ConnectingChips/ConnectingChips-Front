import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './StyleComp/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';
import { StyledToastContainer } from './Component/Toast/StyledToastContainer';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (process.env.REACT_APP_GOOGLE_ANALYTICS)
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
      <StyledToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
