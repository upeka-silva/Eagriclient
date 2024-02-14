import { put, post, api_delete, get } from "../../../../services/api";

export const saveCropDisease = async (
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await post('crop/crop-diseases' , payload, true);
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

export const updateCropDisease = async (
    id = '',
    payload = {},
    onSuccess = () => { },
    onError = (_message) => { }
) => {
  try {
    const response = await put('crop/crop-diseases/' + id, payload, true);
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

export const deleteCropDisease = async (
  id,
  onSuccess = () => { },
  onError = (_message) => { }
) => {
  try {
    const response = await api_delete(`crop/crop-diseases/` + id, true);
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

export const get_CropDiseaseList = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const { httpCode, payloadDto } = await get(
      "crop/crop-diseases",
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