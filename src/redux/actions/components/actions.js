import { post } from "../../../services/api";

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
            onError(apiError?.message || 'Something went wrong! Please try again.');
        } else {
            onError(error);
        }
    }
}