import { v4 as uuidv4 } from 'uuid';
import { BlocBuilder } from '@felangel/react-bloc';
import React, { Fragment } from 'react';
import { CustomSnackbarProps, CustomSnackbar } from './Snackbars';
import { AlertBlocContext } from '../blocs/alertBloc';

export const AlertComponent: React.SFC<Record<string, unknown>> = (): JSX.Element => {
    return (
        <AlertBlocContext.Consumer>
            {(alertBloc) => (
                <BlocBuilder
                    bloc={alertBloc}
                    builder={(state: CustomSnackbarProps | null) => {
                        if (state) {
                            return <CustomSnackbar key={uuidv4()} type={state.type} message={state.message} />;
                        }
                        return <Fragment></Fragment>;
                    }}
                />
            )}
        </AlertBlocContext.Consumer>
    );
};
