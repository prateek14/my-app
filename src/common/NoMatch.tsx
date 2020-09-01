import { useLocation } from 'react-router-dom';
import React from 'react';

const NoMatch: React.SFC<unknown> = (): JSX.Element => {
    const location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
};
export default NoMatch;
