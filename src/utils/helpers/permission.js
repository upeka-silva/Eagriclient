import { getLSItem } from "../../services/storage"
import { StorageConstants } from "../../services/storage/constant"

export const getUserLoggedState = async () => {
    try {
        const token = (await getLSItem(StorageConstants.token, false)).value;
        return token !== null || false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getCurrentUserPermissionList = async () => {
    try {
        const token = (await getLSItem(StorageConstants.token, false)).value;
        if (token === null) {
            return [];
        }
        const authString = window.atob(token.split('.')[1] || '');
        const authorities = (JSON.parse(authString) || {})?.permissions || [];
        return authorities;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getUserPermissionStateByAuthority = async (permission) => {
    try {
        const authorities = await getCurrentUserPermissionList() || [];
        return authorities.findIndex(a => a?.authority === permission) > -1 || false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getUserPermissionStateByModule = async (module) => {
    try {
        const authorities = await getCurrentUserPermissionList() || [];
        return authorities.find(a => {
            let auth = (a?.authority || "")?.toLowerCase();
            return auth.startsWith(module?.toLowerCase()) || auth.endsWith(module?.toLowerCase());
        }).length > 0 || false;
    } catch (error) {
        console.log(error);
        return false;
    }
}