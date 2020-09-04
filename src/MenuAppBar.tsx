import React, { PropsWithChildren, Fragment } from 'react';
import logo from './logo.svg';
import { createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { List, Hidden, Drawer, withTheme, WithTheme, withStyles, WithStyles } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './MenuAppBar.scss';
import ListItemLink from './common/ListItemLink';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { RecipeListComponent } from './recipes/RecipeListComponent';
import NoMatch from './common/NoMatch';
import { BlocBuilder } from '@felangel/react-bloc';
import { pageTitleBloc } from './blocs/pageTitleBloc';
import { Home } from './home/Home';
import { FilteredTodoListComponent } from './todos/TodoListComponent';

export interface MenuAppBarProps extends WithTheme, WithStyles, RouteComponentProps {}

export interface MenuAppBarState {
    mobileOpen: boolean;
}

const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    });

class MenuAppBarRaw extends React.Component<PropsWithChildren<MenuAppBarProps>, MenuAppBarState> {
    constructor(props: PropsWithChildren<MenuAppBarProps>) {
        super(props);
        this.state = {
            mobileOpen: false,
        };
    }

    setMobileOpen(newMobileOpen: boolean): void {
        this.setState({
            mobileOpen: newMobileOpen,
        });
    }

    render(): React.ReactNode {
        const classes = this.props.classes;
        const theme = this.props.theme;
        const handleDrawerToggle = () => {
            this.setMobileOpen(!this.state.mobileOpen);
        };

        const drawer = (
            <div>
                <List>
                    <ListItemLink key="Home" icon={<InboxIcon />} to="/" primary="Home" />
                    <ListItemLink key="todo" icon={<MailIcon />} to="/todos" primary="TODOs" />
                    <ListItemLink key="rfi" icon={<MailIcon />} to="/recipe" primary="Recipes" />
                </List>
            </div>
        );

        const container = window !== undefined ? () => window.document.body : undefined;

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <div className="flex-center">
                            <img src={logo} className="App-logo" />
                            <Typography variant="h6" noWrap>
                                <BlocBuilder
                                    bloc={pageTitleBloc}
                                    builder={(state: string) => {
                                        return <Fragment>{state}</Fragment>;
                                    }}
                                />
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="js">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}>
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="js">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open>
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/todos">
                            <FilteredTodoListComponent key="todos" />
                        </Route>
                        <Route path="/recipe">
                            <RecipeListComponent key="recipe-list" />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const MenuAppBar = withRouter(withStyles(styles)(withTheme(MenuAppBarRaw)));
export default MenuAppBar;
