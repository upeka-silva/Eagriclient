import { post } from '../../../services/api';
import { removeLSItem, setLSItem } from '../../../services/storage';
import { StorageConstants } from '../../../services/storage/constant';
import { defaultMessages } from '../../../utils/constants/apiMessages';
import { decompressJWT } from '../../../utils/helpers/permission';

export const initiateLogin = async (
	body,
	updateAuthContext = (_val = '') => {},
	onSuccess = () => {},
	onError = (_val) => {}
) => {
	try {
		const response = await post('user/login', body, false);
		if (response.httpCode === '200 OK' && response.payload.jwtToken) {
			const jwtToken = decompressJWT(response.payload.jwtToken);
			await setLSItem(StorageConstants.token, jwtToken);
			await setLSItem(
				StorageConstants.compress_token,
				response.payload.jwtToken
			);
			updateAuthContext(jwtToken);
			onSuccess();
		} else {
			throw response;
		}
	} catch ({ error }) {
		if (typeof error === 'object') {
			const { data } = error;
			const { apiError } = data;
			onError(apiError?.message || defaultMessages.apiErrorUnknown);
		} else {
			onError(error);
		}
	}
};

export const initiateLogout = async (
	resetAuthContext = () => {},
	onSuccess = () => {},
	onError = (_val) => {}
) => {
	try {
		await removeLSItem(StorageConstants.token);
		await removeLSItem(StorageConstants.compress_token);
		resetAuthContext();
		onSuccess();
	} catch (_error) {
		onError('Unable to logout');
	}
};
