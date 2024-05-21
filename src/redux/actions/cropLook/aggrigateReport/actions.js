import { put, get, post, api_delete, getBlob } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const createBiWeeklyReport = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("crop-look/bi-week-reporting", payload, true);
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

export const updateBiWeekReporting = async (
  id,
  cropCategoryId,
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/bi-week-reporting/${id}/category/${cropCategoryId}/crop-targets`,
      payload,
      true
    );
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

export const approveBiWeekCategoryReport = async (
  seasonId,
  weekId,
  cropCategoryId,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/crop-category-report/ada/season/${seasonId}/week/${weekId}/category/${cropCategoryId}`,
      null,
      true
    );
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

export const approveBiWeekCategoryReportDD = async (
  seasonId,
  weekId,
  cropCategoryId,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/crop-category-report/dd/season/${seasonId}/week/${weekId}/category/${cropCategoryId}`,
      null,
      true
    );
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

export const changeStatusOfBiWeekReport = async (
  id,
  status,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/bi-week-reporting/${id}/status/${status}`,
      null,
      true
    );
    if (response?.httpCode === "200 OK") {
      onSuccess();
      return response.payload;
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

export const createDamageExtents = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(
      "crop-look/bi-week-damage-extents",
      payload,
      true
    );
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

export const updateDamageExtents = async (
  varietyReportId,
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `crop-look/bi-week-damage-extents/variety-report/${varietyReportId}`,
      payload,
      true
    );
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

export const getAggrigateReportData = async (categoryId, seasonId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/varietySummary/category/${categoryId}/season/${seasonId}`,
      true
    );
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

export const getAggrigateReportDataAILevel = async (categoryId, seasonId, aiId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/varietySummary/category/${categoryId}/season/${seasonId}/aiId/${aiId}`,
      true
    );
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

export const getAggrigateReportDataAILevelByCrop = async (categoryId, seasonId, weekId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/aiViewByCrop/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
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

export const getAggrigateReportDataADALevel = async (categoryId, seasonId, adaId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/varietySummary/category/${categoryId}/season/${seasonId}/adaId/${adaId}`,
      true
    );
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

export const getNationalData = async (categoryId, seasonId, weekId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/nationalViewByDistrict/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
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

export const getProgressTrackerNode = async (categoryId, seasonId, weekId) => {
  try {
    const { httpCode, payload } = await get(
      `crop-look/progress-status-tracker/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
    if (httpCode === "200 OK") {
      return payload;
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

export const approveNationalData = async (categoryId, seasonId, weekId,onSuccess = () => { },
onError = (_message) => { }) => {
  
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/vegetable-early-warnings/approve/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
    if (httpCode === "200 OK") {
      onSuccess();
      return payloadDto;
    }
    return {
      dataList: [],
    };
  } catch (error) {
    const { data } = error;
    const { apiError } = data;
    onError(apiError?.message || defaultMessages.apiErrorUnknown);
    console.log(error);
    return {
      dataList: [],
    };
  }
};

export const getAggrigateBiWeekReportData = async (
  categoryId,
  seasonId,
  weekId
) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/biWeekProgress/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
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

export const getApprovalData = async (seasonId, weekId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/crop-category-summary/forADA/season/${seasonId}/week/${weekId}`,
      true
    );
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

export const getApprovalDataDD = async (seasonId, weekId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/crop-category-summary/forDD/season/${seasonId}/week/${weekId}`,
      true
    );
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

export const getCropLookSeasons = async () => {
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

export const getAggregateBiWeekReport = async (seasonId, weekId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-bi-week-reporting/aggregate?seasonId=${seasonId}&weekId=${weekId}`,
      true
    );
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

export const getTargetCropsByAiAndSeasonAndCropCategory = async (
  aiId,
  seasonId,
  categoryId
) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/crop-registration/ai-region/${aiId}/season/${seasonId}/cropCategory/${categoryId}`,
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

export const getTargetSeasonalRegion = async (id) => {
  try {
    const { httpCode, payload } = await get(
      "crop-look/target-seasonal-region/" + id,
      true
    );
    if (httpCode === "200 OK") {
      return {
        dataList: payload,
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

export const deleteBiWeeklyReporting = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `crop-look/bi-week-reporting/${id || ""}`,
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

export const downloadDDSummaryExcel = async (
  seasonId,
  categoryId,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const blobData = await getBlob(
      `crop-look/dd-report/crop-category/${categoryId}/season/${seasonId}/export/excel`,
      true
    );
    if (blobData) {
      const fileName = `Aggregated_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      onSuccess();
    } else {
      const exception = {
        error: {
          data: {
            apiError: {
              message: blobData?.message || defaultMessages.apiErrorUnknown,
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

export const getCropCategoryReport = async (categoryId, seasonId, weekId) => {
  try {
    const { httpCode, payload} = await get(
      `crop-look/crop-category-report/national-approve/category/${categoryId}/season/${seasonId}/week/${weekId}`,
      true
    );
    if (httpCode === "200 OK") {
      return payload;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const getAggrigateReportDataADDLevel = async (categoryId, seasonId, ddId) => {
  try {
    const { httpCode, payloadDto } = await get(
      `crop-look/dd-report/aggrigated-report/category/${categoryId}/season/${seasonId}/dd/${ddId}`,
      true
    );
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