import ReactDOM from "react-dom/client";
import MobileBGS from "./StyleComp/MobileBGS";
import App from "./App";
import GlobalStyle from "./StyleComp/GlobalStyle";
import reportWebVitals from "./reportWebVitals";
// import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <MobileBGS>
    <GlobalStyle />
    <App />
  </MobileBGS>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

