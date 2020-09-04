import React, { Fragment, useEffect, useContext } from 'react';
import { pageTitleBloc } from '../blocs/pageTitleBloc';
import { Card, CardContent, Typography, CircularProgress, CardActions, IconButton, Tooltip } from '@material-ui/core';
import { Todo } from '../models/todo';
import { BlocBuilder } from '@felangel/react-bloc';
import todoBloc, { TodoState, TodoFetchEvent, TodoDoneEvent } from '../blocs/todoBloc';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { AlertBlocContext } from '../blocs/alertBloc';

export const TodoListComponent: React.SFC<{ todos: Todo[] }> = ({ todos }: { todos: Todo[] }): JSX.Element => {
    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <div style={style} key={index}>
                <TodoListItem key={index} todo={todos[index]} />
            </div>
        );
    }

    return (
        <FixedSizeList height={880} width="100%" itemSize={220} itemCount={todos.length}>
            {renderRow}
        </FixedSizeList>
    );
};

export const FilteredTodoListComponent: React.SFC<Record<string, unknown>> = (): JSX.Element => {
    useEffect(() => {
        pageTitleBloc.dispatch('TODOs');
        todoBloc.dispatch(new TodoFetchEvent());
    }, []);

    const alertBloc = useContext(AlertBlocContext);

    if (alertBloc) {
        useEffect(() => {
            const sub = todoBloc.state.subscribe((state) => {
                if (state.alert) {
                    alertBloc.dispatch(state.alert);
                }
            });

            return () => {
                sub.unsubscribe();
            };
        }, []);
    }

    return (
        <Fragment>
            <BlocBuilder
                bloc={todoBloc}
                builder={(state: TodoState) => {
                    if (state.fetching) {
                        return <CircularProgress />;
                    }
                    if (state.error) {
                        return <p>{state.error}</p>;
                    }
                    if (state.todos && state.todos.length) {
                        return <TodoListComponent todos={state.todos} />;
                    }
                    return <p>No TODOs</p>;
                }}
            />
        </Fragment>
    );
};

export const TodoListItem: React.SFC<{ todo: Todo }> = ({ todo }: { todo: Todo }): JSX.Element => {
    return (
        <Card key={todo.id}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    TODO #{todo.id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {todo.title}
                </Typography>
                {todo.completed && <Typography color="textSecondary">Done</Typography>}
                {!todo.completed && (
                    <Typography variant="body2" component="p">
                        NOT Done
                    </Typography>
                )}
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Mark as Complete">
                    <IconButton onClick={() => todoBloc.dispatch(new TodoDoneEvent(todo.id, true))}>
                        <CheckIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};
