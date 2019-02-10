import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { UAParser } from 'ua-parser-js';

import store from './redux/store';
import './styles/animations.css';
import './styles/dropdown.css';
import './styles/header.css';
import './styles/index.css';
import './styles/language.css';
import './styles/loader.css';
import './styles/workload.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const deviceType = new UAParser().getResult().device.type;

if (deviceType) {
    document.body.classList.add(deviceType);
}

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
