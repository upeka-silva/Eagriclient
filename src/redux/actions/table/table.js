import { get, post } from '../../../services/api/index'
export const get_DataList = async (path, page = 0, size = 10) => {
    try {
        const { totalElements, httpCode, payloadDto } = await get(`${path}?page=${page}&size=${size}`, true);
        if (httpCode === '200 OK') {
            return {
                dataList: payloadDto,
                totalcount: totalElements,
            };
        }
        return {
            dataList: [],
            totalcount: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            dataList: [],
            totalcount: 0,
        };
    }
}

export const post_DataList = async (path, page = 0, size = 10, body = {}) => {
    try {
        const { totalElements, httpCode, payloadDto } = await post(`${path}?page=${page}&size=${size}`, body, true);
        if (httpCode === '200 OK') {
            return {
                dataList: payloadDto,
                totalCount: totalElements,
            };
        }
        return {
            dataList: [],
            totalCount: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            dataList: [],
            totalCount: 0,
        };
    }
}