import React, { ReactNode, Fragment } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import RecipeSingleComponent from './RecipeSingleComponent';
import { RecipeItem } from '../reducers';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { CombinedState, Dispatch } from 'redux';
import { RecipeAction, addRecipe } from '../actions';
import { Button } from '@material-ui/core';
import { pageTitleBloc } from '../blocs/pageTitleBloc';

export type RecipeListProps = RecipeListStateProps & RecipeListDispatchProps & RouteComponentProps;

export interface RecipeListStateProps {
    recipes: RecipeItem[];
}

export interface RecipeListDispatchProps {
    addRecipe: (text: string) => RecipeAction;
}

export interface RecipeListItemsProps {
    text: string;
    onClick?: () => void;
}

const RecipeListItem: React.SFC<RecipeListItemsProps> = (props: RecipeListItemsProps) => (
    <li onClick={props.onClick}>{props.text}</li>
);

class RecipeListComponentRaw extends React.Component<RecipeListProps> {
    constructor(p: RecipeListProps) {
        super(p);
        pageTitleBloc.dispatch('Recipe List');
    }
    render(): ReactNode {
        const match = this.props.match;
        let input: HTMLInputElement | null;
        return (
            <Fragment>
                <Switch>
                    <Route path={`${match.path}/:id`}>
                        <RecipeSingleComponent />
                    </Route>
                    <Route path={match.path}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!input || !input.value.trim()) {
                                    return;
                                }
                                this.props.addRecipe(input.value);
                                input.value = '';
                            }}>
                            <input ref={(node) => (input = node)} />
                            <Button variant="contained" color="primary" disableElevation type="submit">
                                Add
                            </Button>
                        </form>
                        <ul>
                            {this.props.recipes.map((recipe) => (
                                <RecipeListItem key={recipe.id} {...recipe} />
                            ))}
                        </ul>
                    </Route>
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps: MapStateToProps<
    RecipeListStateProps,
    Record<string, unknown>,
    CombinedState<{ recipes: RecipeItem[] }>
> = (state: CombinedState<{ recipes: RecipeItem[] }>) => ({
    recipes: state.recipes,
});

const mapDispatchToProps: MapDispatchToProps<RecipeListDispatchProps, Record<string, unknown>> = (
    dispatch: Dispatch<RecipeAction>,
) => ({
    addRecipe: (text: string): RecipeAction => dispatch(addRecipe(text)),
});

export const RecipeListComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipeListComponentRaw));
