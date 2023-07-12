import { post, put, api_delete, get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleAgroEco = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("aez", payload, true);
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

export const get_agroEcoList = async (
  ) => {
    try {
      const { httpCode, payloadDto } = await get("aez", true);
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

export const deleteAgroEco = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`aez/${id || ''}`, true);
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

export const updateAgroEco = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`aez/${payload?.id || ''}`, payload, true);
    if (response.httpCode === "201 CREATED") {
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
