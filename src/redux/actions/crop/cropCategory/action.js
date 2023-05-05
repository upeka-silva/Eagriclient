import { get,post } from "../../../../services/api";

export const handleCropCategory = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("geo-data/crop-categories", payload, true);
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

export const get_CategoryList = async (
  onSuccess = () => {},
  onError = (_message) => {},
) => {
  try {
    const {httpCode, payloadDto} = await get("geo-data/crop-categories", true);
    if (httpCode === '200 Ok') {
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
