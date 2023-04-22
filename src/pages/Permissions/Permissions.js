import React from 'react';
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { useUserAccessValidation } from "../../hooks/authentication";
import RoleList from './RoleList';

const Permissions = () => {

    useUserAccessValidation();

    return (
        <div>
            <PermissionWrapper
                withoutPermissions
            >
                <RoleList />
            </PermissionWrapper>
        </div>
    );
}

export default Permissions;
