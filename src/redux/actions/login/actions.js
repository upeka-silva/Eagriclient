import { post } from '../../../services/api'
import { removeLSItem, setLSItem } from '../../../services/storage';
import { StorageConstants } from '../../../services/storage/constant';

export const initiateLogin = async (body, onSuccess = () => { }, onError = (_val) => { }) => {
    try {
        const response = await post('user/login', body, false);
        if (response.httpCode === '200 OK' && response.payload.jwtToken) {
            await setLSItem(StorageConstants.token, response.payload.jwtToken);
            onSuccess();
        } else {
            throw response;
        }
    } catch ({ error }) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message)
        } else {
            onError(error);
        }
    }
}

export const initiateLogout = async (onSuccess = () => { }, onError = (_val) => { }) => {
    try {
        await removeLSItem(StorageConstants.token);
        onSuccess();
    } catch (_error) {
        onError("Unable to logout");
    }
}