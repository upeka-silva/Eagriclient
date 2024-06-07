import { api_delete, put } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const updateStatusCropDamageReporting = async (
    id,
    onSuccess = () => { },
    onError = (_message) => { },
    refreshList
  ) => {
    try {
      const response = await put(
        `crop-damage-reporting/update-crop-damage-status/${id || ""}`,
        id,
        true
      );
      if (response.httpCode === "200 OK") {
        onSuccess();
        refreshList();
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


  export const cropDamageReportingRejected = async (
    id,
    onSuccess = () => { },
    onError = (_message) => { }
  ) => {
    try {
      const response = await api_delete(`crop-damage-reporting/${id || ""}`, true);
      console.log(response);
      if (response?.httpCode === "200 OK") {
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