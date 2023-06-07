import { post } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleComponent = async (payload = {}, onSuccess = () => { }, onError = (_message) => { }) => {
    try {
        const response = await post('components', payload, true);
        if (response.httpCode === '200 OK') {
            onSuccess();
        } 
        console.log(response);
    } catch ({ error }) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
    }
}