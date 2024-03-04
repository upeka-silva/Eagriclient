import { put, post, get, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const createCropConfig = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await post("crop-look/configuration", payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess();
      return response.payload
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
};

export const getConfigurationById = async (id) => {
  try {
    const { httpCode, payload } = await get(`crop-look/configuration/${id || ''}`, true);
    if (httpCode === "200 OK") {
      return payload;
    }
    return {
      dataList: [],
    };
  } catch (error) {
    console.log(error);
    return {
      dataList: [],
    };
  }
};


export const deleteCropConfiguration = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`crop-look/configuration/${id || ''}`, true);
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

export const updateCropConfig = async (
  id,
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`crop-look/configuration/${id || ''}`, payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess();
      return response.payload;
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
};

