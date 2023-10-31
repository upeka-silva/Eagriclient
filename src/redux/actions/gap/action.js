import { put, post, get, api_delete, patch } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleGap = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("gap-request", payload, true);
    if (response.httpCode === "200 OK") {
      const { payload } = response;
      onSuccess(payload.id);
      console.log("Success");
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
    return response;
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
    const response = await put(
      `gap-request/${payload?.id || ""}`,
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
    return response;
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

export const get_GapRequestList = async () => {
  try {
    const { httpCode, payloadDto } = await get("gap-request", true);
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

export const handleCropDetails = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const gapReqId = payload?.gapRequestDto?.id;
    const response = await post(
      "gap-request/" + gapReqId + "/crop-areas",
      payload,
      true
    );
    if (response.httpCode === "200 OK") {
      onSuccess();
      console.log("Success");
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

export const updateCropDetails = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const gapReqId = payload?.gapRequestDto?.id;
    const response = await put(
      `gap-request/` + gapReqId + `/crop-areas/${payload?.id || ""}`,
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

export const getCropDetailsList = async (gapReqId = null) => {
  try {
    const { httpCode, payloadDto } = await get(
      "gap-request/" + gapReqId + "/crop-areas",
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

export const deleteCropDetails = async (
  gapReqId,
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `gap-request/${gapReqId || ""}/crop-areas/${id || ""}`,
      true
    );
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
};

export const changeStatus = async (
  gapReqId,
  newStatus,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const payload = { status: newStatus };

    const response = await put(
      `gap-request/` + gapReqId + `/status/` + newStatus,
      JSON.stringify(payload),
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
