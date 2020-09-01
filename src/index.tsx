import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import MenuAppBar from './MenuAppBar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Fragment>
            <CssBaseline />
            <React.StrictMode>
                <HashRouter>
                    <MenuAppBar></MenuAppBar>
                </HashRouter>
            </React.StrictMode>
        </Fragment>
    </Provider>,
    document.getElementById('root'),
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
