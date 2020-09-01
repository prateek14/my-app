import React, { ReactNode, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class RfiSingleComponent extends React.Component<RouteComponentProps> {
    render(): ReactNode {
        const params = this.props.match.params as { rfiId: string };
        return (
            <Fragment>
                <h2>RFI Single {params.rfiId}</h2>
            </Fragment>
        );
    }
}

export default withRouter(RfiSingleComponent);
