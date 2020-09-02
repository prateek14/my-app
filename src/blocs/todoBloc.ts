import { Bloc } from '@felangel/bloc';
import { Todo } from '../models/todo';
import { AlertBloc } from './alertBloc';

export enum TodoEventType {
    fetch = 'FETCH',
    markDone = 'MARK_DONE',
}

export interface TodoEvent {
    type: TodoEventType;
}

abstract class TodoEventBase implements TodoEvent {
    type: TodoEventType;
    constructor(type: TodoEventType) {
        this.type = type;
    }
}

export class TodoFetchEvent extends TodoEventBase {
    id?: number;
    userId?: number;
    completed?: boolean;
    constructor(id?: number, userId?: number, completed?: boolean) {
        super(TodoEventType.fetch);
        this.id = id;
        this.userId = userId;
        this.completed = completed;
    }
}

export class TodoDoneEvent extends TodoEventBase {
    id?: number;
    done?: boolean;
    constructor(id: number, done: boolean) {
        super(TodoEventType.markDone);
        this.id = id;
        this.done = done;
    }
}

export interface TodoState {
    count?: number;
    todos?: Todo[];
    fetching?: boolean;
    error?: string;
    lastFetched?: Date;
}

class TodoBloc extends Bloc<TodoEvent, TodoState> {
    alertBloc = new AlertBloc();
    initialState(): TodoState {
        return { count: 0, fetching: false, todos: [] };
    }

    async *mapEventToState(event: TodoEvent): AsyncIterableIterator<TodoState> {
        switch (event.type) {
            case TodoEventType.fetch:
                yield* this.fetchTodos(event);
                break;
            case TodoEventType.markDone:
                yield* this.toggleDone(event);
                break;
        }
    }

    async *toggleDone(event: TodoDoneEvent): AsyncIterableIterator<TodoState> {
        const api = 'https://jsonplaceholder.typicode.com/todos/' + event.id;
        try {
            const response = await fetch(api, {
                method: 'PATCH',
                body: JSON.stringify({
                    completed: event.done,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const item: Todo = await response.json();

            if (event.done) {
                this.alertBloc.dispatch({ type: 'success', message: 'Item #' + event.id + ' marked as done!' });
            }

            yield* this.patchItem(item);
        } catch (e) {
            console.log(e);
        }
    }

    async *fetchTodos(event: TodoFetchEvent): AsyncIterableIterator<TodoState> {
        if (
            !this.currentState.count ||
            !this.currentState.lastFetched ||
            new Date().valueOf() - this.currentState.lastFetched.valueOf() >= 5 * 60000
        ) {
            yield { fetching: true };
            let api = 'https://jsonplaceholder.typicode.com/todos?';
            if (event.id) {
                api = api + 'id=' + event.id;
            }
            try {
                const response = await fetch(api);
                const todos: Todo[] = await response.json();
                yield {
                    fetching: false,
                    todos: todos,
                    count: todos.length,
                    lastFetched: new Date(),
                };
            } catch (e) {
                yield { error: e };
            }
        }
    }

    private async *patchState(s: TodoState): AsyncIterableIterator<TodoState> {
        if (s) {
            yield Object.assign(JSON.parse(JSON.stringify(this.currentState)), s);
        }
    }

    private async *patchItem(item: Todo): AsyncIterableIterator<TodoState> {
        if (this.currentState.todos && this.currentState.count) {
            const s: TodoState = JSON.parse(JSON.stringify(this.currentState));
            const foundIndex = s.todos?.findIndex((x) => x.id === item.id);
            if (foundIndex !== undefined && foundIndex >= 0) {
                s.todos?.splice(foundIndex, 1, ...[item]);
            }
            yield s;
        }
    }
}

const todoBloc = new TodoBloc();

export default todoBloc;
