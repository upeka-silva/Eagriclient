import { put, get, post, api_delete, getBlob } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const handleCropVariety = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("geo-data/crop-varieties", payload, true);
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

export const get_CategoryList = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const { httpCode, payloadDto } = await get(
      "geo-data/crop-categories",
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
export const get_CropById = async (
    id,
    onSuccess = () => {},
    onError = (_message) => {},
    path = 'geo-data/crops/crop-sub-category/' + id
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

export const get_all_CropById = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {},
  path = 'geo-data/crops/crop-sub-category/' + id + '/all'
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

export const getCropsByCropCategory = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {},
  path = `geo-data/crops/crop-category/${id}?size=200`
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

export const getCropVarietiesByCropId = async (
  cropId,
  onSuccess = () => {},
  onError = (_message) => {},
) => {
try {
  const path = `geo-data/crop-varieties/crop/${cropId}`;
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

export const updateCropVariety = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(
      `geo-data/crop-varieties/${payload?.id || ""}`,
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

export const deleteCropVariety = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await api_delete(
      `geo-data/crop-varieties/${id || ""}`,
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

export const handleCropVarietyImage = async (
  id,
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post(`geo-data/crop-varieties/${id}/variety-image`, payload, true);
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
};
export const downloadCropVarietyExcel = async () => {
  try {
    const blobData = await getBlob(
      "geo-data/crop-varieties/export/excel",
      true
    );
    const fileName = `cropVariety_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    const url = window.URL.createObjectURL(new Blob([blobData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error(error);
}
}
