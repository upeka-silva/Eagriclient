import { post } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const initiateSignUp = async (
  body,
  onSuccess = () => {},
  onError = (_val) => {}
) => {
  try {
    const response = await post("temp-user/register", body, false);
    if (response.httpCode === "200 OK") {
      onSuccess("registered successfully");
    } else {
      throw response;
    }
    return response;
  } catch ({ error }) {
    if(error?.status === 409) {
      onError(error.data);
    } else if (typeof error === "object") {
      const { data } = error;
      const { apiError } = data;
      onError(apiError?.message || defaultMessages.apiErrorUnknown);
    } else {
      onError(error);
    }
  }
};

export const initiateVerifyOTP = async (
  body,
  onSuccess = () => {},
  onError = (_val) => {}
) => {
  try {
    const response = await post("temp-user/verify", body, false);
    if (response.httpCode === "200 OK") {
      onSuccess("successfully verified");
    } else {
      throw response;
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
