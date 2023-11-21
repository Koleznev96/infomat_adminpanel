/**
 * @link https://www.npmjs.com/package/react-app-polyfill
 */
import 'react-app-polyfill/stable';
import 'reflect-metadata';
import '@mohayonao/web-audio-api-shim';
import 'intersection-observer';

import React from 'react';
import {createRoot} from 'react-dom/client';

import './DiInit';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const container = document.getElementById('bodycontainer');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);

serviceWorker.unregister();
