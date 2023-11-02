import React from 'react';
import { useAuthContext } from '../../context/AuthContext';

const PermissionWrapper = ({
	component,
	permission,
	withoutPermissions = false,
	majorModule,
	children,
}) => {
	const {
		getUserLoggedState,
		getUserPermissionStateByModule,
		getUserPermissionStateByAuthority,
	} = useAuthContext();

	const checkPermission = () => {
		if (withoutPermissions) {
			return getUserLoggedState() || false;
		}
		if (majorModule) {
			return getUserPermissionStateByModule(majorModule) || false;
		}
		if (permission) {
			return getUserPermissionStateByAuthority(permission) || false;
		}
		return true;
	};

	if (checkPermission()) {
		return component || children || null;
	}

	return null;
};

export default PermissionWrapper;
