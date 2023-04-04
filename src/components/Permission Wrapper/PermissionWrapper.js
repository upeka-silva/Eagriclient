import { useState, useEffect } from 'react';
import { getUserLoggedState, getUserPermissionStateByAuthority, getUserPermissionStateByModule } from '../../utils/helpers/permission';

const PermissionWrapper = ({ component, permission, withoutPermissions = false, majorModule }) => {

    const [hasPermission, setHasPermission] = useState(false);

    const checkPermission = async () => {
        try {
            if (withoutPermissions) {
                return await getUserLoggedState() || false;
            }
            if (majorModule) {
                return await getUserPermissionStateByModule(majorModule) || false;
            }
            if (permission) {
                return await getUserPermissionStateByAuthority(permission) || false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        (async () => {
            setHasPermission(await checkPermission());
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (hasPermission) {
        return component;
    }

    return null;
}

export default PermissionWrapper;
