import { put, get, post, api_delete,getBlob } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const createCropRegistration = async (
  payload1 = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("crop-look/crop-registration", payload1, true);
    // console.log('after crop look registration action ');
    // console.log(payload);
    if (response?.httpCode === "200 OK") {
      onSuccess();
      return {
        dataList: response?.payload,
      };
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

export const getAllDDLevelRegions = async () => {
  try {
    const { httpCode, payloadDto } = await get(
      "crop-target/ddLevelRegions",
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

export const getSeasons = async () => {
  try {
    const { httpCode, payloadDto } = await get(
      "crop-look/seasons/enabled",
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

export const updateDistrict = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `geo-data/districts/${payload?.id || ""}`,
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

export const getCropRegistrationById = async (id) => {
  try {
    const { httpCode, payload } = await get(
      `crop-look/crop-registration/${id}`,
      true
    );
    if (httpCode === "200 OK") {
      return {
        data: payload,
      };
    }
    return {
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
    };
  }
};

export const saveCropRegistrationItems = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(`crop-target/crop-registration`, payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess();
      return {
        dataList: response?.payload || {},
      };
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

export const updateCropRegistrationItems = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-target/crop-registration/${payload.id}`,
      payload,
      true
    );
    if (response.httpCode === "200 OK") {
      onSuccess();
      return {
        dataList: response?.payload || {},
      };
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

export const deleteIndicativeTargetRegistration = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `crop-target/crop-registration/${id || ""}`,
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

export const getSummaryByDDIdAndSeason = async (ddId, seasonId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-target/summary/dd/${ddId}/season/${seasonId}`,
      true
    );
    if (httpCode === "200 OK") {
      return {
        data: payloadDto,
      };
    }
    return {
      data: {},
    };
  } catch (error) {
    console.log(error);
    return {
      data: {},
    };
  }
};

export const getSummaryByAiIdAndSeason = async (aiId, seasonId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-target/summary/ai/${aiId}/season/${seasonId}`,
      true
    );
    if (httpCode === "200 OK") {
      return {
        data: payloadDto,
      };
    }
    return {
      data: {},
    };
  } catch (error) {
    console.log(error);
    return {
      data: {},
    };
  }
};


  export const downloadDDsummaryExcel = async (
    onSuccess = () => { },
    onError = (_message) => { }
  ) => {
    try {
      const blobData = await getBlob("crop-target/summary/dd/export/excel", true);
      if (blobData) {
        const fileName = `ddSummary_${new Date().toISOString().split('T')[0]}.xlsx`;
        const url = window.URL.createObjectURL(new Blob([blobData]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        onSuccess();
      } else {
        const exception = {
          error: {
            data: {
              apiError: {
                message:
                  blobData?.message || defaultMessages.apiErrorUnknown,
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
    };
  
  }