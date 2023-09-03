import { put, get, post, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const handleCrop = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("geo-data/crops", payload, true);
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

export const get_CropList = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const { httpCode, payloadDto } = await get(
      "geo-data/crops",
      true
    );
    if (httpCode === "200 OK") {
      return {
        dataList: payloadDto,
      };
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

export const get_SubCategoryById = async (
    id,
    onSuccess = () => {},
    onError = (_message) => {},
    path = "geo-data/crop-sub-categories/crop-category/" + id
    
) => {
  try {
    const { httpCode, payloadDto } = await get(path, true);
    if (httpCode === "200 OK") {
      return {
        dataList: payloadDto,
      };
    }
    return {
      dataList: [],
    };
  } catch (error) {
    console.error(error);
    return {
      dataList: [],
    };
  }
};

export const updateCrop = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `geo-data/crops/${payload?.id || ""}`,
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

export const deleteCrop = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(`geo-data/crops/${id || ""}`, true);
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
