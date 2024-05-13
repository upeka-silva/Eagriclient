import axios from "axios";
import { get } from "../../../services/api";

export const get_vegetable_early_warnings = async () => {
  try {
    //const { httpCode, payloadDto } = await get("vegetable-early-warnings",true);
    const { httpCode, payloadDto } = await get(`crop-look/vegetable-early-warnings`);

    console.log("payloadDto", payloadDto);
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
