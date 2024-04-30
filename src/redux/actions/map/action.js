import { get } from "../../../services/api";

let json = [];
export const handleMapData = async (mapUrl) => {
  try {
    const response = await get(mapUrl, true);
    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
