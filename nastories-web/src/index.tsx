import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/';
import { Provider } from 'react-redux';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId="1075286664742-righjavc1rvvb1ba5mdk674gv3gis7v3.apps.googleusercontent.com">
  <Provider store={store} >
    <React.StrictMode>
      <Routes />
      <ToastContainer newestOnTop hideProgressBar position="bottom-right" autoClose={2000} />
    </React.StrictMode >
  </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
