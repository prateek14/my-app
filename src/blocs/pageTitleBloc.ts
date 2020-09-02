import { Bloc } from '@felangel/bloc';

class PageTitleBloc extends Bloc<string, string> {
    initialState(): string {
        return 'Home';
    }

    async *mapEventToState(event: string): AsyncIterableIterator<string> {
        yield event;
    }
}

export const pageTitleBloc = new PageTitleBloc();
