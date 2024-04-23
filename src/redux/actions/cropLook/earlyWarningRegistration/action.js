import { put, get, post, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";


export const handleEarlyWarningRegistartion = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await post("crop/early-warning-ranges", payload, true);
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


  export const updateEarlyWarningRegistartion = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await put(
        `crop/early-warning-ranges/${payload?.id || ""}`,
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

  export const get_EarlyWarningRangeeList = async (
    ) => {
      try {
        const { httpCode, payloadDto } = await get("geo-data/provinces");
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

    export const deleteEarlyWarningRange = async (
      id,
      onSuccess = () => {},
      onError = (_message) => {}
    ) => {
      try {
        const response = await api_delete(
          `crop/early-warning-ranges/${id || ""}`,
          true
        );
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


    export const get_VegitableEarlyWarningRangeeList = async (
      ) => {
        try {
          const { httpCode, payloadDto } = await get("crop-look/vegetable-early-warnings", true);
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