import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ActionWrapper } from '../../components/PageLayout/ActionWrapper';
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';
import ComponentList from './ComponentList';
import { useNavigate } from 'react-router';
import { useSnackBars } from '../../context/SnackBarContext';
import { useUserAccessValidation } from '../../hooks/authentication';
import ListHeader from '../../components/ListHeader/ListHeader';
import { Fonts } from "../../utils/constants/Fonts";

const Components = () => {

    useUserAccessValidation();

    const [selectedComponents, setSelectedComponents] = useState([]);
    const [action, setAction] = useState(DEF_ACTIONS.ADD);

    const navigate = useNavigate();

    const toggleComponentSelect = (component) => {
        setSelectedComponents((current = []) => {
            let newList = [...current];
            let index = newList.findIndex(c => c?.id === component?.id);
            if (index > -1) {
                newList.splice(index, 1);
            } else {
                newList.push(component);
            }
            return newList;
        })
    }

    const selectAllComponents = (all = []) => {
        setSelectedComponents(all);
    }

    const resetSelectedComponents = () => {
        setSelectedComponents([]);
    }

    const onCreate = () => {
        setAction(DEF_ACTIONS.ADD);
        navigate('/authentication/component-form', { state: { action: DEF_ACTIONS.ADD } });
    }

    const onEdit = () => {
        setAction(DEF_ACTIONS.EDIT);
        navigate('/authentication/component-form', { state: { action: DEF_ACTIONS.EDIT, target: selectedComponents[0] || {} } });
    }

    const onView = () => {
        setAction(DEF_ACTIONS.VIEW);
        navigate('/authentication/component-form', { state: { action: DEF_ACTIONS.VIEW, target: selectedComponents[0] || {} } });
    }

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: `${Fonts.fontStyle1}`,
            marginTop: "10px",
            height: "90vh",
            overflowY: "scroll",
          }}
        >
            <ListHeader title="Components" />
            <ActionWrapper>
                <PermissionWrapper
                    permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.COMPONENT}`}
                >
                    <Button
                        variant='contained'
                        onClick={onCreate}
                    >
                        {DEF_ACTIONS.ADD}
                    </Button>
                </PermissionWrapper>
                {
                    selectedComponents.length === 1 && (
                        <PermissionWrapper
                            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.COMPONENT}`}
                        >
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={onEdit}
                                sx={{ ml: '8px' }}
                            >
                                {DEF_ACTIONS.EDIT}
                            </Button>
                        </PermissionWrapper>
                    )
                }
                {
                    selectedComponents.length === 1 && (
                        <PermissionWrapper
                            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.COMPONENT}`}
                        >
                            <Button
                                variant='contained'
                                color='info'
                                onClick={onView}
                                sx={{ ml: '8px' }}
                            >
                                {DEF_ACTIONS.VIEW}
                            </Button>
                        </PermissionWrapper>
                    )
                }
            </ActionWrapper>
            <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.COMPONENT}`}
            >
                <ComponentList
                    selectedRows={selectedComponents}
                    onRowSelect={toggleComponentSelect}
                    selectAll={selectAllComponents}
                    unSelectAll={resetSelectedComponents}
                />
            </PermissionWrapper>
        </div>
    );
}

export default Components;
