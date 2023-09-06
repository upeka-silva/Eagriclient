import { put, post, api_delete, get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleMahaweliUnit = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(
      "geo-data/mahaweli-units",
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

export const updateMahaweliUnit= async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `geo-data/mahaweli-units/${payload?.id || ""}`,
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

export const deleteMahaweliUnit= async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `geo-data/mahaweli-units/${id || ""}`,
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

export const get_MahaweliUnitList = async () => {
  try {
    const { httpCode, payloadDto } = await get(
      "geo-data/mahaweli-units",
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

export const get_MahaweliUnitListByBlockId = async (id) => {
  try {
    const { httpCode, payloadDto } = await get(
      "geo-data/mahaweli-units/by-mahaweli-block/" + id,
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
