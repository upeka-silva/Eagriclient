import {put, post, api_delete, get} from "../../../../services/api"

export const handleAuditFormQuestions = async (
    formId = null,
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
    try {
        const response = await post("question-form-template/" + formId + '/questions', payload, true);
        if (response.httpCode === "200 OK") {
            onSuccess(response);
        } else {
            const exception = {
                error: {
                    data: {
                        apiError: {
                            message:
                                response?.message || "Something went wrong! Please try again.",
                        },
                    },
                },
            };
            throw exception;
        }
        console.log(response);
    } catch ({ error }) {
        if (typeof error === "object") {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || "Something went wrong! Please try again.");
        } else {
            onError(error);
        }
    }
};

export const getQuestionsByFormId = async (
    formId = null
) => {
    try {
        const {httpCode, payload} = await get("question-form-template/" + formId, true);
        if (httpCode === '200 OK') {
            return {
                dataList: payload?.questionDTOS
            }
        }
        return {
            dataList: []
        }
    } catch (error) {
        console.log(error)
        return {
            dataList: []
        }
    }
};


export const deleteAuditFormQuestion = async (
    formId = null,
    id,
    onSuccess = () => { },
    onError = (_message) => { }
) => {
    try {
        const response = await api_delete(`question-form-template/${formId || ''}/questions/${id || ''}`, true);
        console.log(response)
        if (response?.httpCode === "200 OK") {
            onSuccess();
        } else {
            const exception = {
                error: {
                    data: {
                        apiError: {
                            message:
                                response?.message || "Something went wrong! Please try again.",
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
            onError(apiError?.message || "Something went wrong! Please try again.");
        } else {
            onError(error);
        }
    }
}

export const updateAuditFormQuestions = async (
    formId = null,
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
    try {
        const response = await put("question-form-template/" + formId + '/questions/' + payload?.id, payload, true);
        if (response.httpCode === "200 OK") {
            onSuccess();
        } else {
            const exception = {
                error: {
                    data: {
                        apiError: {
                            message:
                                response?.message || "Something went wrong! Please try again.",
                        },
                    },
                },
            };
            throw exception;
        }
        console.log(response);
    } catch ({ error }) {
        if (typeof error === "object") {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || "Something went wrong! Please try again.");
        } else {
            onError(error);
        }
    }
};

