import { get } from "../../../services/api";

export const get_HartyPrices= async () => {
    try {
      const { httpCode, payloadDto } = await get("latest-producer-price/getfoodpricedata", true);
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