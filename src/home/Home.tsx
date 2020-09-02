import React from 'react';
import { pageTitleBloc } from '../blocs/pageTitleBloc';

export const Home: React.SFC<Record<string, unknown>> = (): JSX.Element => {
    pageTitleBloc.dispatch('Home');
    return <p>Home</p>;
};
