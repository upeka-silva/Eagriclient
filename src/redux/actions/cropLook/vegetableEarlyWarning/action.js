import { get } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const publishVegetableEarlyWarning = async (
    onSuccess = () => { },
    onError = (_message) => { }
  ) => {
    try {
      const response = await get(`crop-look/vegetable-early-warnings/publish`, true);
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

  export const getAllVegetableEarlyWarning = async (
    onSuccess = () => { },
    onError = (_message) => { }
  ) => {
    try {
      const {httpCode, payloadDto} = await get(`crop-look/vegetable-early-warnings`, true);
      if (httpCode === "200 OK") {
        return {
          dataList: payloadDto
        }
      }
      return {
        dataList: []
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