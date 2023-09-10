import { put, post, api_delete, get } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleMahaweliAuthority = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(
      "geo-data/mahaweli-authorities",
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

export const updateMahaweliAuthority= async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `geo-data/mahaweli-authorities/${payload?.id || ""}`,
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

export const deleteMahaweliAuthority = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `geo-data/mahaweli-authorities/${id || ""}`,
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

export const get_MahaweliAuthorityList = async () => {
  try {
    const { httpCode, payloadDto } = await get(
      "geo-data/mahaweli-authorities",
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
