import React, { useCallback, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { ActionWrapper } from '../../../components/Page Layout/ActionWrapper';
import ProvinceList from './ProvinceList';
import PlusIcon from '@mui/icons-material/Add';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../utils/theme/theme.json';
import PermissionWrapper from '../../../components/Permission Wrapper/PermissionWrapper';
import CustomDialog from '../../../components/Page Layout/Dialog';
import ProvinceForm from './ProvinceForm';

const Province = () => {

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const [action, setAction] = useState('new');
    const [dialogState, setDialogState] = useState(false);

    const openDialog = () => {
        setDialogState(true);
    }

    const closeDialog = () => {
        setDialogState(false);
    }

    const onCreate = useCallback(() => {
        setAction('new');
        openDialog();
    }, []);

    const onView = useCallback((province) => {
        setSelectedProvince(province);
        setAction('view');
        openDialog();
    }, []);

    const onEdit = useCallback((province) => {
        setSelectedProvince(province);
        setAction('edit');
        openDialog();
    }, []);

    const onDelete = useCallback((province) => {
        setSelectedProvince(province);
        setAction('delete');
        openDialog();
    }, []);

    const updateProvince = (value, key) => {
        setSelectedProvince(current => ({ ...current, [key]: value }))
    }

    const toggleSelectedProvinces = (province) => {
        setSelectedProvinces((current = []) => {
            let exists = current.findIndex(c => c?.id === province.id) > -1;
            if (exists) {
                return current.filter(c => c.id !== province.id);
            }
            return [...current, province];
        })
    }

    const selectAllProvinces = (provinces) => {
        setSelectedProvinces(provinces);
    }

    const removeAllSelectedProvinces = () => {
        setSelectedProvinces([]);
    }

    const generatePopUpBody = () => {
        switch (action) {
            case 'new':
            case 'edit':
                return (
                    <ProvinceForm selectedProvince={selectedProvince} updateProvince={updateProvince} />
                )
            case 'view':
                return (
                    <div>
                        <Typography>
                            <br />
                            <b>Province Cocde: </b>{selectedProvince?.provinceCode}
                        </Typography>
                        <Typography>
                            <b>Province Name: </b>{selectedProvince?.name}
                        </Typography>
                    </div>
                );
            case 'delete':
                return (
                    <Typography>
                        <br />
                        Are you sure? If confirmed it cannot be roll backed. Proceed with caution.
                    </Typography>
                );
            default:
                return null;
        }
    }

    const generatePopUpTitle = () => {
        switch (action) {
            case 'new':
                return 'Create New Province';
            case 'view':
                return selectedProvince?.name;
            case 'edit':
                return `Editing ${selectedProvince?.name}`;
            case 'delete':
                return `Deleting ${selectedProvince?.name}`;
            default:
                return null;
        }
    }

    const onConfirm = () => {
        closeDialog();
    }

    return (
        <div>
            <ActionWrapper>
                <PermissionWrapper
                    component={
                        <Button
                            variant='contained'
                            startIcon={<PlusIcon />}
                            sx={{ background: theme.coreColors.secondary }}
                            onClick={onCreate}
                        >
                            Add
                        </Button>
                    }
                />
                {
                    selectedProvinces.length === 1 || selectedProvince ? (
                        <PermissionWrapper
                            component={
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<FileOpenIcon />}
                                    sx={{ ml: '5px' }}
                                    onClick={onCreate}
                                >
                                    View
                                </Button>
                            }
                        />
                    ) : null
                }
                {
                    selectedProvinces.length === 1 || selectedProvince ? (
                        <PermissionWrapper
                            component={
                                <Button
                                    variant='contained'
                                    color='info'
                                    startIcon={<ModeEditIcon />}
                                    sx={{ ml: '5px' }}
                                    onClick={onCreate}
                                >
                                    Update
                                </Button>
                            }
                        />
                    ) : null
                }
                {
                    selectedProvinces.length > 0 || selectedProvince ? (
                        <PermissionWrapper
                            component={
                                <Button
                                    variant='contained'
                                    color='error'
                                    startIcon={<DeleteIcon />}
                                    sx={{ ml: '5px' }}
                                    onClick={onCreate}
                                >
                                    Delete
                                </Button>
                            }
                        />
                    ) : null
                }
            </ActionWrapper>
            <PermissionWrapper
                component={
                    <ProvinceList
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        selectedProvinces={selectedProvinces}
                        setSelectedProvinces={toggleSelectedProvinces}
                        selectAllProvinces={selectAllProvinces}
                        removeSelectedProvinces={removeAllSelectedProvinces}
                    />
                }
            />
            <CustomDialog
                open={dialogState}
                title={generatePopUpTitle()}
                actions={
                    <>
                        <Button variant="contained" onClick={onConfirm}>{action !== 'new' ? action.toUpperCase() : 'CREATE'}</Button>
                        <Button variant="text" color='error' onClick={closeDialog}>CANCEL</Button>
                    </>
                }
                children={generatePopUpBody()}
            />
        </div>
    );
}

export default Province;
