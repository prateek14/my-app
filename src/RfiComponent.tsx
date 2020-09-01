import React, { ReactNode, Fragment } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import RfiSingleComponent from './RfiSingleComponent';
import PageTitle from './common/PageTitle';

export interface RfiListProps extends RouteComponentProps {
    stub?: boolean;
}

class RfiListComponent extends React.Component<RfiListProps> {
    render(): ReactNode {
        const match = this.props.match;
        return (
            <Fragment>
                <Switch>
                    <Route path={`${match.path}/:rfiId`}>
                        <RfiSingleComponent />
                    </Route>
                    <Route path={match.path}>
                        <PageTitle text="RFI List" />
                    </Route>
                </Switch>
            </Fragment>
        );
    }
}

export const RfiListComponentWithRouter = withRouter(RfiListComponent);
