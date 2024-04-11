import { get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const fetchAllRoles = async (onSuccess = () => { }, onError = (_message) => { }) => {
    try {
        const { httpCode, payloadDto, message = '' } = await get('app-settings/roles', true);
        if (httpCode === '200 OK') {
            return payloadDto;
        } else {
            const exception = { error: { data: { apiError: { message: message } } } };
            throw exception;
        }
    } catch ({ error }) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
        return [];
    }
}

export const fetchAllComponents = async (onSuccess = () => { }, onError = (_message) => { }) => {
    try {
        const { httpCode, payloadDto, message = '' } = await get(`components/?page=0&size=1000&sort=asc&sort`, true);
        if (httpCode === '200 OK') {
            return payloadDto;
        } else {
            const exception = { error: { data: { apiError: { message: message } } } };
            throw exception;
        }
    } catch (error) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
        return [];
    }
}

export const fetchAllActions = async (onSuccess = () => { }, onError = (_message) => { }) => {
    try {
        const { httpCode, payloadDto, message = '' } = await get('actions', true);
        if (httpCode === '200 OK') {
            return payloadDto;
        } else {
            const exception = { error: { data: { apiError: { message: message } } } };
            throw exception;
        }
    } catch (error) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
        return [];
    }
}

export const fetchAllPermissions = async (onSuccess = () => { }, onError = (_message) => { }) => {
    try {
        const { httpCode, payloadDto, message = '' } = await get('permissions/?page=0&size=2000&sort=asc&sort', true);
        if (httpCode === '200 OK') {
            return payloadDto;
        } else {
            const exception = { error: { data: { apiError: { message: message } } } };
            throw exception;
        }
    } catch (error) {
        if (typeof error === 'object') {
            const { data } = error;
            const { apiError } = data;
            onError(apiError?.message || defaultMessages.apiErrorUnknown);
        } else {
            onError(error);
        }
        return [];
    }
}