import { get } from "../../../services/api";

export const get_itemNames = async (
    onSuccess = () => {},
    onError = (_message) => {}
   ) => {
    try {
       const {httpCode, payloadDto} = await get("harti-items", true);
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