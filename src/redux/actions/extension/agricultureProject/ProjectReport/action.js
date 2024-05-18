import { api_delete, get, post, put } from "../../../../../services/api";
import { defaultMessages } from "../../../../../utils/constants/apiMessages";

export const handleProjectReport = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await post(
        "extension/project-report",
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

  export const updateProjectReport = async (
    payload = {},
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await put(
        `extension/project-report/${payload?.id || ""}`,
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

  export const deleteProjectReport = async (
    id,
    onSuccess = () => {},
    onError = (_message) => {}
  ) => {
    try {
      const response = await api_delete(
        `extension/project-report/${id || ""}`,
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

  export const getAllProjectDetailsByProjectId = async (projectId) => {

    try {
      const response = await get(
        `extension/agriculture-project/${projectId || ""}`,
        true
      );
      return response;
    } catch ({ error }) {
      return error;
    }


  }

  export const getProjectReportsByRelatedUserId = async () => {
    try {
      const response = await get(
        `extension/project-report/get-report-by-user`,
        true
      );
      return response;
    } catch ({ error }) {
      return error;
    }
  }