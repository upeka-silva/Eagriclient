import { put, post, api_delete, get } from "../../../../services/api";

export const saveFormDataWithValues = async (
    cropId = '',	
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post('crop/' + cropId + '/crop-pests' , payload, true);
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

export const updateFormDataWithValues = async (
    id = '',
    cropId = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await put('crop/' + cropId + '/crop-pests/' + id, payload, true);
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
