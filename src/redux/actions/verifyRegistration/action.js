import { get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const verifyRegistration = async (
    token = '',
    onSuccess = () => { },
    onError = (_message) => { }
) => {
    try {
        const response = await get(`user/verifyRegistration?token=${token}`, false);
        if (response.httpCode === "200 OK") {
            onSuccess();
        } else {
            const exception = {
                error: {
                    data: {
                        apiError: {
                            message:
                                response?.message || defaultMessages.apiErrorUnknown,
                        },
                    },
                },
            };
            throw exception;
        }
    } catch ({ error }) {
        if (typeof error === "object") {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
    }
}

export const resendVerificationToken = async (
    token = '',
    onSuccess = () => { },
    onError = (_message) => { }
) => {
    try {
        const response = await get(`user/resendVerifyToken?oldToken=${token}`, false);
        if (response.httpCode === "200 OK") {
            onSuccess();
        } else {
            const exception = {
                error: {
                    data: {
                        apiError: {
                            message:
                                response?.message || defaultMessages.apiErrorUnknown,
                        },
                    },
                },
            };
            throw exception;
        }
    } catch ({ error }) {
        if (typeof error === "object") {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
    }
}