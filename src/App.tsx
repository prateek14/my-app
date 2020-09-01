import React from 'react';
import MenuAppBar from './MenuAppBar';

export interface IAppInputProps {
    message: string;
}

const App: React.SFC<IAppInputProps> = (): JSX.Element => (
    <div className="App">
        <MenuAppBar></MenuAppBar>
    </div>
);

export default App;
