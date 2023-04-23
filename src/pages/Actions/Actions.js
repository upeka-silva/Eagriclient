import React from 'react';
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { useUserAccessValidation } from '../../hooks/authentication';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';
import ActionList from './ActionList';

const Actions = () => {

    useUserAccessValidation();

    return (
        <div>
            <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ACTION}`}
                component={<ActionList />}
            />
        </div>
    );
}

export default Actions;
