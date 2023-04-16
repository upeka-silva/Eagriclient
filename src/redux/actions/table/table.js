import { get } from '../../../services/api/index'
export const fetchDataList = async (path) => {
    try {
        const response = await get(path);
        if (response) {
            return response;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}