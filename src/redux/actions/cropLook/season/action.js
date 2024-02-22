import { put, post, get, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const handleCropLookSeason = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await post("crop-look/seasons", payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess();
      return response.payload
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

export const getAgriSeasons = async () => {
  try {
    const { httpCode, payloadDto } = await get("geo-data/agriculture-seasons/crop-look", true);
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


export const deleteCropLookSeason = async (
  id,
  onDeleteSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`crop-look/seasons/${id || ''}`, true);
    console.log(response)
    if (response?.httpCode === "200 OK") {
      onDeleteSuccess();
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

export const changeStatusCropLookSeason = async (
  id,
  status,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`crop-look/seasons/${id || ''}/status/${status}`, null, true);
    console.log(response)
    if (response?.httpCode === "200 OK") {
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

export const changeStatusBiWeekData = async (
  seasonId,
  id,
  status,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`crop-look/seasons/${seasonId}/bi-week-data/${id}/status/${status}`, null, true);
    console.log(response)
    if (response?.httpCode === "200 OK") {
      onSuccess();
      return response.payload;
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

export const updateAgriSeason = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`geo-data/agriculture-seasons/${payload?.id || ''}`, payload, true);
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

