import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getUserLoggedState, getUserPermissionStateByAuthority, getUserPermissionStateByModule } from '../../utils/helpers/permission';

const PermissionWrapper = ({ component, permission, withoutPermissions = false, majorModule, children }) => {

    const location = useLocation();

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
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        checkPermission()
            .then(result => setHasPermission(result))
            .catch(() => setHasPermission(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    if (hasPermission) {
        return component || children || null;
    }

    return null;
}

export default PermissionWrapper;
