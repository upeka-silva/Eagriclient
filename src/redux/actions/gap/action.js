import { put, post, get, api_delete, patch, getBlob } from "../../../services/api";
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

export const deleteGapRequest = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(`gap-request/${id}`, true);
    console.log(response)
    if (response?.httpCode === "200 OK") {
      onSuccess();
    } else {
      const exception = {
        error: {
          data: {
            apiError: {
              message:
              response?.message || "Something went wrong! Please try agin.",
            },
          },
        },
      };
      throw exception;
    }
  } catch ({error}) {
    if (typeof error === "object") {
      const {data} = error;
      const {apiError} = data;
      onError(apiError?.message || "Something went wrong! Please try again.");
    } else {
      onError(error);
    }
  }
}

export const saveGapExternalAuditores = async (
  gapId,
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(`gap-request/${gapId}/external-auditor`, payload, true);
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

export const get_GapRequestActionList = async (
  gapReqId
) => {
  try {
    const { httpCode, payloadDto } = await get(`gap-request-actions/getByGapId/${gapReqId}?page=0&size=1000`, true);
    if (httpCode === "200 OK") {
      return {
        actionList: payloadDto,
      };
    }
    return {
      actionList: [],
    };
  } catch (error) {
    console.log(error);
    return {
      actionList: [],
    };
  }
};

export const getUsersByRoleCode = async (code) => {
  try {
    const { httpCode, payloadDto } = await get(`user/code/${code}`, true);
    if (httpCode === "200 OK") {
      return payloadDto;
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

export const getGapCertificate = async (gapId) => {
  try {
    const response = await getBlob(`gap-certificate/${gapId}`, true);
    return response;
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
  rejectReason,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const payload = { status: newStatus, reason: null };
    if(rejectReason){
      payload.reason = rejectReason;
    }
    const response = await put(
      `gap-request/` + gapReqId + `/status/` + newStatus,
      payload,
      true
    );

    if (response.httpCode === "200 OK") {
      onSuccess(gapReqId);
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
    return response
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

export const addGapRequestAction = async (
  gapReqId,
  newStatus,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const payload = { status: newStatus };

    const response = await post(
      `gap-request-actions/${gapReqId}/status/${newStatus}`,
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
    return response
  } catch ({ error }) {
    if (typeof error === "object") {
      const { data } = error;
      const { apiError } = data;
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
}

export const uploadOtherCertificate = async (
  gapReqId, 
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(
      `gap-request/${gapReqId}/other-certificate`,
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
}