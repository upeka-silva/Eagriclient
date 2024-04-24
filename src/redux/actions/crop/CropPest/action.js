import { put, post, api_delete, get, getBlob } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";

export const saveCropPest = async (
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post('crop/crop-pests' , payload, true);
    console.log('response code ----> >' + response.httpCode);
    if (response.httpCode === "200 OK") {
      console.log(1);
      onSuccess(response);
    } else {
      console.log(2);
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
    console.log(3);
    if (typeof error === "object") {
      const { data } = error;
      const { apiError } = data;
      onError(apiError?.message || "Something went wrong! Please try again.");
    } else {
      console.log(4);
      onError(error);
    }
  }
};

export const updateCropPest = async (
    id = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await put('crop/crop-pests/' + id, payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess(response);
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

export const deleteCropPest = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`crop/crop-pests/` + id, true);
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
};

export const get_CropPestList = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const { httpCode, payloadDto } = await get(
      "crop/crop-pests",
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

export const assignCropPest = async (
  cropId,
  formDataD =[],
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await put(`geo-data/crops/${cropId || ''}/pests`, formDataD['cropPest'], true);
    if (response.httpCode === "200 OK") {
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
};

export const getPestsByCropId = async (
  cropId = null,
) => {
try {
  const {httpCode, payloadDto} = await get("crop/crop-pests/" + cropId + '/pests', true);
  if (httpCode === '200 OK') {
    return {
      data: payloadDto
    }
  }
  return {
    data: {}
  }
} catch (error) {
  console.log(error)
  return {
    data: {}
  }
}
};

export const deletePestFromCrop = async (
  cropId,
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`crop/crop-pests/` + cropId + `/crop-pests/` + id, true);
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
};

export const downloadCropPestExcel = async () => {
  try {
    const blobData = await getBlob(
      "crop/crop-pests/export/excel",
      true
    );
    const fileName = `cropPest_${
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