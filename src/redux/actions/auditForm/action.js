import {put, post, api_delete, get} from "../../../services/api"

export const handleAuditForm = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await post("question-form-template", payload, true);
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

export const deleteAuditForm = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`question-form-template/${id || ''}`, true);
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
}

export const updateAuditForm = async (
  payload = {},
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await put(`question-form-template/${payload?.id || ''}`, payload, true);
    if (response.httpCode === "200 OK") {
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

export const getFormTemplateByType = async (
    type = null
) => {
  try {
    const {httpCode, payload} = await get("question-form-template/type/" + type, true);
    if (httpCode === '200 OK') {
      return {
        data: payload
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

export const getFormTemplatesByFormLandId = async (
    formLandId = null,
    type = ''
) => {
  try {
    const {httpCode, payloadDto} = await get("farm-land/" + formLandId + '/' + type, true);
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

export const getFormTemplatesByGapReqId = async (
    gapReqId = null,
    type = ''
) => {
  try {
    const {httpCode, payloadDto} = await get("gap-request/" + gapReqId + '/' + type, true);
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

export const saveFormDataWithValues = async (
    farmLandId = '',
    uri = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post('farm-land/' + farmLandId + '/' + uri, payload, true);
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

export const saveGapDataWithValues = async (
    gapId = '',
    uri = '',
    payload = {},
    fileData = {},
    qid = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post('gap-request/' + gapId + '/' + uri, payload, true);
    if (response.httpCode === "200 OK") {
      onSuccess(response, qid, fileData);
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

export const updateFormDataWithValues = async (
    id = '',
    farmLandId = '',
    uri = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await put('farm-land/' + farmLandId + '/' + uri + '/' + id, payload, true);
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

export const updateGapDataWithValues = async (
    id = '',
    gapId = '',
    uri = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await put('gap-request/' + gapId + '/' + uri + '/' + id, payload, true);
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


export const fileUploadForm = async (
    gapId = '',
    uri = '',
    auditId = '',
    payload = {},
    qid = '',
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    ///farm-land/{farmLandId}/self-assessment/{assessmentId}
    const response = await post('file-upload/gap-request/' + gapId + '/' + uri + '/' + auditId, payload, true, null, true);
    if (response.httpCode === "200 OK") {
      onSuccess(response, qid);
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
