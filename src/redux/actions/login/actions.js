import { post } from '../../../services/api'
import { removeLSItem, setLSItem } from '../../../services/storage';
import { StorageConstants } from '../../../services/storage/constant';
import { decompressJWT } from '../../../utils/helpers/permission';

export const initiateLogin = async (body, onSuccess = () => { }, onError = (_val) => { }) => {
    try {
        const response = await post('user/login', body, false);
        if (response.httpCode === '200 OK' && response.payload.jwtToken) {
            const jwtToken = decompressJWT(response.payload.jwtToken);
            await setLSItem(StorageConstants.token, jwtToken);
            onSuccess();
        } else {
            throw response;
        }
    } catch ({ error }) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || 'Something went wrong! Please try again.');
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