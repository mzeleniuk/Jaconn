import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { UAParser } from 'ua-parser-js';
import 'react-day-picker/dist/style.css';

import App from './App';
import store from './redux/store';
import './styles';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const deviceType = new UAParser().getResult().device.type;
const root = createRoot(container);

if (deviceType) {
    document.body.classList.add(deviceType);
}

root.render(<Provider store={store}><App /></Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
