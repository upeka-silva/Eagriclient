import React, { useState } from 'react';
import { Button, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { ActionWrapper } from '../../components/PageLayout/ActionWrapper';
import { CardWrapper } from '../../components/PageLayout/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DEF_ACTIONS } from '../../utils/constants/permission';
import { handleComponent } from '../../redux/actions/components/actions';
import { useSnackBars } from '../../context/SnackBarContext';
import { useUserAccessValidation } from '../../hooks/authentication';
import { SnackBarTypes } from '../../utils/constants/snackBarTypes';

const ComponentForm = () => {

    useUserAccessValidation();

    const { state } = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState(state?.target || {});
    const [saving, setSaving] = useState(false);

    const { addSnackBar } = useSnackBars();

    const goBack = () => {
        navigate('/authentication/components')
    }

    const handleChange = (value, target) => {
        setFormData((current = {}) => {
            let newData = { ...current };
            newData[target] = value;
            return newData;
        })
    }

    const resetForm = () => {
        if (state?.action === DEF_ACTIONS.EDIT) {
            setFormData(state?.target || {});
        } else {
            setFormData({});
        }
    }

    const enableSave = () => {
        if (state?.action === DEF_ACTIONS.EDIT) {
            if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
                return true;
            }
        }
        if (state?.action === DEF_ACTIONS.ADD && Object.keys(formData || {}).length > 0) {
            return true;
        }
        return false;
    }

    const onSuccess = () => {
        addSnackBar({ type: SnackBarTypes.success, message: state?.action === DEF_ACTIONS.ADD ? 'Successfully Added' : 'Successfully Updated' });
        setSaving(false);
    }

    const onError = (message) => {
        addSnackBar({ type: SnackBarTypes.error, message: message || 'Login Failed' })
        setSaving(false);
    }

    const handleFormSubmit = async () => {
        if (enableSave()) {
            setSaving(true);
            try {
                await handleComponent(formData, onSuccess, onError);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <ActionWrapper isLeft>
                <Button startIcon={<ArrowBackIcon />} onClick={goBack}>Go back to list</Button>
            </ActionWrapper>
            <CardWrapper>
                <ActionWrapper isLeft>
                    {
                        saving && <CircularProgress size={20} sx={{ mr: '8px' }} />
                    }
                    <Typography variant='h6'>{state?.action} COMPONENT {state?.target?.code && `${state?.target?.code}`}</Typography>
                </ActionWrapper>
                <Divider sx={{ mb: '20px', mt: '6px' }} />
                <Grid container spacing={2} sx={{ mb: '6px' }}>
                    <Grid item sm={6}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <TextField
                                    label='Name'
                                    placeholder='Name'
                                    id='componentName'
                                    value={formData?.name || ''}
                                    fullWidth
                                    disabled={state?.action === DEF_ACTIONS.VIEW}
                                    onChange={e => handleChange(e?.target?.value || '', 'name')}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    label='Code'
                                    placeholder='Code'
                                    id='componentCode'
                                    value={formData?.code || ''}
                                    fullWidth
                                    disabled={state?.action === DEF_ACTIONS.VIEW}
                                    onChange={e => handleChange(e?.target?.value || '', 'code')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <TextField
                                    label='Created At'
                                    placeholder='Created At'
                                    id='componentCreatedAt'
                                    value={formData?.createdDate ? (new Date(formData?.createdDate || undefined)).toLocaleString() : ''}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    label='Modified At'
                                    placeholder='Modified At'
                                    id='componentModifiedAt'
                                    value={formData?.modifiedDate ? (new Date(formData?.modifiedDate || undefined)).toLocaleString() : ''}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    state?.action !== DEF_ACTIONS.VIEW && (
                        <ActionWrapper>
                            {
                                saving ? (
                                    <Button
                                        variant='contained'
                                        disabled
                                        endIcon={<CircularProgress size={20} />}
                                    >
                                        {state?.action === DEF_ACTIONS.ADD ? 'ADDING...' : 'UPDATING...'}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant='contained'
                                            startIcon={state?.action === DEF_ACTIONS.ADD ? <AddIcon /> : <SaveIcon />}
                                            disabled={!enableSave()}
                                            onClick={handleFormSubmit}
                                        >
                                            {state?.action === DEF_ACTIONS.ADD ? 'ADD' : 'UPDATE'}
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='error'
                                            sx={{ ml: '8px' }}
                                            startIcon={<RestartAltIcon />}
                                            onClick={resetForm}
                                        >
                                            RESET
                                        </Button>
                                    </>
                                )
                            }
                        </ActionWrapper>
                    )
                }
            </CardWrapper>
        </div>
    );
}

export default ComponentForm;
