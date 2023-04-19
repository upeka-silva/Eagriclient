import React, { useEffect } from 'react';
import { Stack, Snackbar, Alert } from '@mui/material';
import { useSnackBars } from '../../context/SnackBarContext';

const SnackBars = () => {

    const { snackBars, removeSnackBar, resetSnackBar } = useSnackBars();

    useEffect(() => {
        if (snackBars.length > 0 && snackBars.filter(s => s === null).length === snackBars.length) {
            resetSnackBar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackBars]);

    const renderSnackBar = () => {
        return snackBars.map((s, key) => {
            if (s) {
                let handleClose = () => removeSnackBar(key);
                return (
                    <Snackbar
                        key={key}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={true}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert
                            variant='filled'
                            onClose={handleClose}
                            severity={s?.type || 'info'}
                            sx={{ width: '100%' }}
                        >
                            {s?.message || s?.type || 'Message not found'}
                        </Alert>
                    </Snackbar>
                )
            }
            return null;
        })
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {renderSnackBar()}
        </Stack>
    );
}

export default SnackBars;
