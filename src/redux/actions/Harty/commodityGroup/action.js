import { get } from "../../../services/api";


export const get_CommodityGroup= async () => {
    try {
      const { httpCode, payloadDto } = await get("harti/commodity-group", true);
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