import React from 'react';
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { useUserAccessValidation } from '../../hooks/authentication';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';
import ActionList from './ActionList';
import ListHeader from '../../components/ListHeader/ListHeader';
import { Fonts } from "../../utils/constants/Fonts";


const Actions = () => {

    useUserAccessValidation();

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
            <ListHeader title="Actions" />
            <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.ACTION}`}
                component={<ActionList />}
            />
        </div>
    );
}

export default Actions;
