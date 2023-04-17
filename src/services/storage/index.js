export const getLSItem = async (key = "", shouldParse) => {
  return new Promise(async (resolve) => {
    try {
      const result = await localStorage.getItem(key);
      if (![null, undefined].includes(result)) {
        resolve({
          value: shouldParse ? JSON.parse(result) : result,
          error: null,
        });
      }
      resolve({
        value: null,
        error: "Value not found",
      });
    } catch (error) {
      resolve({
        value: null,
        error: JSON.stringify(error),
      });
    }
  });
};

export const setLSItem = (key = "", value) => {
  try {
    const targetValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, targetValue);
  } catch (error) {
    throw error;
  }
};

export const removeLSItem = async (key = '') => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
}
