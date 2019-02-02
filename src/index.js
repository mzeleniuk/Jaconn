import React from 'react';
import ReactDOM from 'react-dom';
import { UAParser } from 'ua-parser-js';

import './styles/header.css';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const deviceType = new UAParser().getResult().device.type;

if (deviceType) {
    document.body.classList.add(deviceType);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
