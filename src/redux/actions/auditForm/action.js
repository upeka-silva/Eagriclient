import {put, post, api_delete, get} from "../../../services/api"

export const handleAuditForm = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await post("question-form-template", payload, true);
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

export const deleteAuditForm = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`question-form-template/${id || ''}`, true);
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

export const updateAuditForm = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`question-form-template/${payload?.id || ''}`, payload, true);
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

export const getFormTemplateByType = async (
    type = null
) => {
  try {
    const {httpCode, payload} = await get("question-form-template/type/" + type, true);
    if (httpCode === '200 OK') {
      return {
        data: payload
      }
    }
    return {
      data: {}
    }
  } catch (error) {
    console.log(error)
    return {
      data: {}
    }
  }
};

export const saveFormDataWithValues = async (
    uri = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post(uri, payload, true);
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


