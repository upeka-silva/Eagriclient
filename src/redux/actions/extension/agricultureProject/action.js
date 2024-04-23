import { post , put, get, api_delete } from "../../../../services/api";
import { defaultMessages } from "../../../../utils/constants/apiMessages";


export const handleAgricultureProject = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await post("extension/agriculture-project", payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess(response);
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


export const get_AgricultureProjectList = async (
) => {
  try {
    const { httpCode, payloadDto } = await get("extension/agriculture-project");
    if (httpCode === '200 OK') {
      return {
        dataList: payloadDto
      }
    }
    return {
      dataList: []
    }
  } catch (error) {
    console.log(error)
    return {
      dataList: []
    }
  }
};

export const deleteAgricultureProject = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`extension/agriculture-project/${id || ''}`, true);
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



export const updateAgricultureProject = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`extension/agriculture-project/${payload?.id || ''}`, payload, true);
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

export const getDiseasesByCropId = async (
  cropId = null,
) => {
try {
  const {httpCode, payloadDto} = await get("crop/crop-diseases/" + cropId + '/diseases', true);
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

export const changeStatus = async (
  projectId,
  newStatus,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const payload = { status: newStatus };
   
    const response = await put(
      `extension/agriculture-project/${projectId}/status/${newStatus}`,
      payload,
      true
    );

    if (response.httpCode === "200 OK" && response.resultStatus === "SUCCESSFUL") {
      console.log("success1")
      onSuccess(response.payload);
      console.log("Status changed successfully for project:", response.payload);
    } else {
      console.log("error1")
      const errorMessage = response?.message || "Unknown error";
      const exception = {
        error: {
          data: {
            apiError: {
              message: errorMessage
            }
          }
        }
      };
      throw exception;
    }
    
    return response;
  } catch (error) {
    console.error("Error while changing status:", error);
    const errorMessage = error?.error?.data?.apiError?.message || "Unknown error";
    onError(errorMessage);
  }
};