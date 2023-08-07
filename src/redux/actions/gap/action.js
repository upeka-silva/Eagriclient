import { put, post, get, api_delete } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleGap = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("gap-request", payload, true);
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

export const updateGap = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await put(`gap-request/${payload?.id || ""}`, payload, true);
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