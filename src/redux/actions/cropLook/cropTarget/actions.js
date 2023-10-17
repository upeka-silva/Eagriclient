import { put, get, post, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

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

export const getDDDivisionsByLogedInUser = async () => {
  try {
    const { httpCode, payloadDto } = await get("crop-look/dd-divisions", true);
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
      const { httpCode, payloadDto } = await get("seasons", true);
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

export const getTargetCropsByAiAndSeasonAndCropCategory = async (aiId, seasonId, categoryId) => {
  try {
    const { httpCode, payloadDto } = await get(`crop-look/crop-registration/ai-region/${aiId}/season/${seasonId}/cropCategory/${categoryId}`, true);
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

export const updateCropRegistrationItems = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/crop-registration/${payload?.id}/category/${payload?.categoryId}`,
      payload,
      true
    );
    if (response.httpCode === "200 OK") {
      onSuccess();
      return {
        dataList: response?.payload || {} ,
      }
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

export const deleteDistrict = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(`geo-data/districts/${id || ""}`, true);
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


export const get_DistrictListByProvinceId = async (id) => {
  try {
    const { httpCode, payloadDto } = await get("geo-data/districts/province/" + id, true);
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