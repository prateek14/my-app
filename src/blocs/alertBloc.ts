import { Bloc } from '@felangel/bloc';
import { CustomSnackbarProps } from '../common/Snackbars';
import React from 'react';

export class AlertBloc extends Bloc<CustomSnackbarProps, CustomSnackbarProps | null> {
    initialState(): CustomSnackbarProps | null {
        return null;
    }

    async *mapEventToState(event: CustomSnackbarProps): AsyncIterableIterator<CustomSnackbarProps | null> {
        yield event;
    }

    dispose(): void {
        super.dispose();
        console.log('Alert Bloc disposed.');
    }
}

export const AlertBlocContext = React.createContext<AlertBloc | null>(null);
