import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';

ReactDOM.render(
    <Fragment>
        <CssBaseline />
        <React.StrictMode>
            <HashRouter>
                <App message="Hello World" />
            </HashRouter>
        </React.StrictMode>
    </Fragment>,
    document.getElementById('root'),
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
