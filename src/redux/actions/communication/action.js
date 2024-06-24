import { api_delete, get, post, put } from "../../../services/api";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export const getMessageGroupList = async (
    onSuccess = () => {},
    onError = (_message) => {},
  ) => {
    try {
      const {httpCode, payloadDto} = await get("communication/message-groups", true);
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

  export const createGroup = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await post("communication/message-groups", payload, true);
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

  export const getMessageList = async (
    type,value, page,
  ) => {
    try {
      const {httpCode, payloadDto, totalPages} = await get(`communication/messages?recipientType=${type}&recipientValue=${value}&page=${page}&size=10`, true);
      if (httpCode === '200 OK') {
        return {
          dataList: payloadDto,
          totalPages: totalPages,
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

  export const updateGroup = async (
    id,
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await put(`communication/message-groups/${id || ''}`, payload, true);
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

  export const deleteMessageGroup = async (
    formData,
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await api_delete(
        `communication/message-groups/${formData?.id || ""}`,
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

  export const getContactList = async (
    onSuccess = () => {},
    onError = (_message) => {},
  ) => {
    try {
      const {httpCode, payloadDto} = await get("communication/private-chats/get-contacts-list", true);
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

  export const createPrivateChat = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await post("communication/private-chats", payload, true);
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


  export const getPrivateChatList = async (
    onSuccess = () => {},
    onError = (_message) => {},
  ) => {
    try {
      const {httpCode, payloadDto} = await get("communication/private-chats", true);
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

  export const deletePrivateChat = async (
    formData,
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await api_delete(
        `communication/private-chats/${formData?.id || ""}`,
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