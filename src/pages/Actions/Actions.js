import React from 'react';
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { useUserAccessValidation } from '../../hooks/authentication';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';
import ActionList from './ActionList';
import ListHeader from '../../components/ListHeader/ListHeader';

const Actions = () => {

    useUserAccessValidation();

    return (
        <div>
            <ListHeader title="Actions" />
            <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ACTION}`}
                component={<ActionList />}
            />
        </div>
    );
}

export default Actions;
