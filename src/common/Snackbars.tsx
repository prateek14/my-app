import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import * as A from '@material-ui/lab/Alert';

const Alert: React.SFC<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export interface CustomSnackbarProps {
    type: A.Color;
    message: string;
}

export const CustomSnackbar: React.SFC<CustomSnackbarProps> = (props: CustomSnackbarProps): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.type}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
