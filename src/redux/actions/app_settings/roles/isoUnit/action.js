import { api_delete, get, post, put } from "../../../../../services/api";
import { defaultMessages } from "../../../../../utils/constants/apiMessages";

export const handleIsoUnit = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await post("iso-units", payload, true);
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
      console.log(response);
    } catch ({ error }) {
      if (typeof error === "object") {
        const { data } = error;
        const { apiError } = data;
        onError(apiError?.message || defaultMessages.apiErrorUnknown);
      } else {
        onError(error);
      }
    }
  };

export const updateIsoUnit= async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await put(
        `iso-units/${payload?.id || ""}`,
        payload,
        true
      );
      if (response.httpCode === "200 OK") {
        onSuccess();
      } else {
        const exception = {
          error: {
            data: {
              apiError: {
                message: response?.message || defaultMessages.apiErrorUnknown,
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
        onError(apiError?.message || defaultMessages.apiErrorUnknown);
      } else {
        onError(error);
      }
    }
  };

  export const deleteIsoUnit = async (
    id,
    onSuccess = () => { },
    onError = (_message) => { }
  ) => {
    try {
      const response = await api_delete(`iso-units/${id || ''}`, true);
      console.log(response)
      if (response?.httpCode === "200 OK") {
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

  export const get_isoUnitList = async (
    onSuccess = () => {},
    onError = (_message) => {},
  ) => {
    try {
      const {httpCode, payloadDto} = await get("iso-units", true);
      if (httpCode === '200 OK') {
        return {
          dataList: payloadDto
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