import { get } from "../../../services/api";

export const getAllHartiData = async () => {
  try {
    const payloadDto = await get(
      "latest-producer-price/getfoodpricedata",
      true
    );
    console.log({ payloadDto });

    return {
      dataList: payloadDto,
    };
  } catch (error) {
    console.log(error);
    return {
      dataList: [],
    };
  }
};
