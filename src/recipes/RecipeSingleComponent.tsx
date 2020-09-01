import React, { ReactNode, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class RecipeSingleComponent extends React.Component<RouteComponentProps> {
    render(): ReactNode {
        const params = this.props.match.params as { id: string };
        return (
            <Fragment>
                <h2>Recipe Single {params.id}</h2>
            </Fragment>
        );
    }
}

export default withRouter(RecipeSingleComponent);
