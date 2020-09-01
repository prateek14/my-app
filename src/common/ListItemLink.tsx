import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './ListItemLink.scss';

export interface ListItemLinkProps {
    icon: React.ReactNode;
    primary?: React.ReactNode;
    to: string;
}

const ListItemLink: React.SFC<ListItemLinkProps> = (props: ListItemLinkProps): JSX.Element => {
    const { icon, primary, to } = props;
    const comp = (linkProps: unknown, ref: React.Ref<HTMLAnchorElement>) => {
        return <NavLink ref={ref} to={to} {...linkProps} />;
    };
    const CustomLink = React.useMemo(() => React.forwardRef(comp), [to]);
    const match = useRouteMatch({
        path: to,
        strict: false,
        exact: true,
    });
    return (
        <li>
            <ListItem selected={!!match} button component={CustomLink}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export default ListItemLink;
