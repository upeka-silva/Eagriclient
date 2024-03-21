import { get } from "../../../services/api";

export const get_CommodityItem= async () => {
    try {
      const { httpCode, payloadDto } = await get("geo-data/commodity-item", true);
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