import { get } from "../../../services/api";

export const get_EconomicCenter= async () => {
    try {
      const { httpCode, payloadDto } = await get("geo-data/economic-center", true);
      if (httpCode === "200 OK") {
        return {
          dataList: payloadDto
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