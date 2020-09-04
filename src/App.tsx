import React, { Fragment, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { HashRouter } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { AlertComponent } from './common/Alert';
import { AlertBlocContext, AlertBloc } from './blocs/alertBloc';

export const App: React.SFC<Record<string, unknown>> = (): JSX.Element => {
    const alertBloc = new AlertBloc();
    useEffect(() => {
        return () => {
            alertBloc?.dispose();
        };
    }, []);
    return (
        <Fragment>
            <CssBaseline />
            <React.StrictMode>
                <AlertBlocContext.Provider value={alertBloc}>
                    <HashRouter>
                        <MenuAppBar></MenuAppBar>
                        <AlertComponent />
                    </HashRouter>
                </AlertBlocContext.Provider>
            </React.StrictMode>
        </Fragment>
    );
};
