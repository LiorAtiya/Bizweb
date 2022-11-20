import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//for robofriends
import 'tachyons';
import { BusinessProvider } from "./context/BusinessContext"
import { AuthContextProvider } from './context/AuthContext';

//for calender
// import "react-datetime/css/react-datetime.css";

ReactDOM.render(

    <AuthContextProvider>
        <BusinessProvider>
            <App />
        </BusinessProvider>
    </AuthContextProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
