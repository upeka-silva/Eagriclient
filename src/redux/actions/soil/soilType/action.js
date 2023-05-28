import { api_delete, put, get, post } from "../../../../services/api";

export const handleSoilType = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("soil-types", payload, true);
    if (response.httpCode === "201 CREATED") {
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


export const get_SoilType = async () => {
  try {
    const { httpCode, payloadDto } = await get("soil-types", true);
    if (httpCode === "200 OK") {
      return {
        dataList: payloadDto
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

export const updateSoilType = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(`soil-types/${payload?.id || ''}`, payload, true);
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

export const deleteSoilType = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`soil-types/${id || ''}`, true);
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
