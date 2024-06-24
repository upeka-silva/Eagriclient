import { post, put, api_delete, get,getBlob } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const handleScsService = async (
  payload = {},
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await post("geo-data/scs-services", payload, true);
    if (response.httpCode  === "200 OK") {
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

export const get_ScsServiceList = async (
  ) => {
    try {
      const { httpCode, payloadDto } = await get("geo-data/scs-services", true);
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

export const deleteScsService = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`geo-data/scs-services/${id || ''}`, true);
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

export const updateScsService = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`geo-data/scs-services/${payload?.id || ''}`, payload, true);
    if (response.httpCode  === "200 OK") {
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
export const downloadScsExcel = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const blobData = await getBlob("geo-data/scs-services/export/excel", true);
    if (blobData) {
      const fileName = `geo-data/scs-services${
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
