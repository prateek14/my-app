import { Bloc, Transition } from '@felangel/bloc';
import { Todo } from '../models/todo';
import { CustomSnackbarProps } from '../common/Snackbars';

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

export interface ITodoState {
    count?: number;
    todos?: Todo[];
    fetching?: boolean;
    error?: string;
    lastFetched?: Date;
    alert?: CustomSnackbarProps | null;
}

export class TodoState implements ITodoState {
    count?: number;
    todos?: Todo[];
    fetching?: boolean;
    error?: string;
    lastFetched?: Date;
    alert?: CustomSnackbarProps | null;
    constructor(s: ITodoState) {
        this.count = s.count;
        this.todos = s.todos;
        this.fetching = s.fetching;
        this.error = s.error;
        this.lastFetched = s.lastFetched;
        this.alert = s.alert;
    }

    patch(s?: ITodoState): TodoState {
        if (s) {
            return Object.assign(new TodoState(this), s);
        }
        return this;
    }

    patchItem(item?: Todo): TodoState {
        if (item && this.todos && this.count) {
            const foundIndex = this.todos?.findIndex((x) => x.id === item.id);
            if (foundIndex !== undefined && foundIndex >= 0) {
                const s = new TodoState(this);
                s.todos?.splice(foundIndex, 1, ...[item]);
            }
        }
        return this;
    }
}

class TodoBloc extends Bloc<TodoEvent, TodoState> {
    initialState(): TodoState {
        return new TodoState({ count: 0, fetching: false, todos: [] });
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
            yield this.currentState.patch({ fetching: true });
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

            yield this.currentState.patch({
                alert: event.done ? { type: 'success', message: 'Item #' + event.id + ' marked as done!' } : null,
            });
            yield this.currentState.patch({
                fetching: false,
                alert: null,
            });
            yield this.currentState.patchItem(item);
        } catch (e) {
            yield this.currentState.patch({ fetching: false });
            console.log(e);
        }
    }

    onTransition(transition: Transition<TodoEvent, TodoState>): void {
        console.log(transition);
    }

    async *fetchTodos(event: TodoFetchEvent): AsyncIterableIterator<TodoState> {
        if (
            !this.currentState.count ||
            !this.currentState.lastFetched ||
            new Date().valueOf() - this.currentState.lastFetched.valueOf() >= 5 * 60000
        ) {
            yield this.currentState.patch({ fetching: true });
            let api = 'https://jsonplaceholder.typicode.com/todos?';
            if (event.id) {
                api = api + 'id=' + event.id;
            }
            try {
                const response = await fetch(api);
                const todos: Todo[] = await response.json();
                yield new TodoState({
                    fetching: false,
                    todos: todos,
                    count: todos.length,
                    lastFetched: new Date(),
                });
            } catch (e) {
                yield new TodoState({ error: e });
            }
        }
    }
}

const todoBloc = new TodoBloc();

export default todoBloc;
