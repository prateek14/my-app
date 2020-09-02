import { Bloc } from '@felangel/bloc';
import { CustomSnackbarProps } from '../common/Snackbars';

export class AlertBloc extends Bloc<CustomSnackbarProps, CustomSnackbarProps | null> {
    initialState(): CustomSnackbarProps | null {
        return null;
    }

    async *mapEventToState(event: CustomSnackbarProps): AsyncIterableIterator<CustomSnackbarProps | null> {
        yield event;
    }
}
