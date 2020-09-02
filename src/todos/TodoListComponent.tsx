import React, { Fragment } from 'react';
import { pageTitleBloc } from '../blocs/pageTitleBloc';
import { Card, CardContent, Typography, CircularProgress, CardActions, IconButton, Tooltip } from '@material-ui/core';
import { Todo } from '../models/todo';
import { BlocBuilder } from '@felangel/react-bloc';
import todoBloc, { TodoState, TodoFetchEvent, TodoDoneEvent } from '../blocs/todoBloc';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { CustomSnackbarProps, CustomSnackbar } from '../common/Snackbars';
import { v4 as uuidv4 } from 'uuid';

export const TodoListComponent: React.SFC<Record<string, unknown>> = (): JSX.Element => {
    pageTitleBloc.dispatch('TODOs');
    todoBloc.dispatch(new TodoFetchEvent());
    return (
        <Fragment>
            <BlocBuilder
                bloc={todoBloc.alertBloc}
                builder={(state: CustomSnackbarProps | null) => {
                    if (state) {
                        return <CustomSnackbar key={uuidv4()} type={state.type} message={state.message} />;
                    }
                    return <Fragment></Fragment>;
                }}
            />
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
                        return (
                            <Fragment>
                                {state.todos.map((todo) => (
                                    <TodoListItem key={todo.id} todo={todo} />
                                ))}
                            </Fragment>
                        );
                    }
                    return <p>No TODOs</p>;
                }}
            />
        </Fragment>
    );
};

export const TodoListItem: React.SFC<{ todo: Todo }> = ({ todo }: { todo: Todo }): JSX.Element => {
    return (
        <Card key={todo.id} style={{ marginBottom: '12px' }}>
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
