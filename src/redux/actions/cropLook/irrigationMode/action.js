import { get } from "../../../../services/api";

export const getIrrigationModeProgress = async (seasonId, categoryId) => {
    try {
      const { httpCode, payloadDto } = await get(`crop-look/dd-report/varietyProgress/category/${categoryId}/season/${seasonId}`, true);
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


  export const getvarietyProgress = async (seasonId, categoryId) => {
    
    try {
      const { httpCode, payloadDto } = await get(`crop-look/dd-report/irrigationModeProgress/category/${categoryId}/season/${seasonId}`, true);
      console.log({payloadDto})
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


  export const getTargetExtent = async (seasonId, categoryId) => {
    
    try {
      const { httpCode, payloadDto } = await get(`crop-look/dd-report/targetExtentByDistrict/category/${categoryId}/season/${seasonId}`, true);
      console.log({payloadDto})
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


  