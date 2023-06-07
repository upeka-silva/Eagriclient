import { post, get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleGnDivision = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("geo-data/gn-divisions", payload, true);
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

export const get_GnDivisionList = async (
  ) => {
    try {
      const { httpCode, payloadDto } = await get("geo-data/gn-divisions", true);
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
  