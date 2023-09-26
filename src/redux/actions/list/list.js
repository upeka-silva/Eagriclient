import { get, post } from '../../../services/api/index';
export const get_DataList = async (path, page = 0, size = 10) => {
	try {
		const { totalElements, httpCode, payloadDto } = await get(
			`${path}?page=${page}&size=1000&sort=asc&sort`,
			true
		);
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
};

export const post_DataList = async (path, page = 0, size = 10, body = {}) => {
	try {
		// const token =
		// 	(await getLSItem(StorageConstants.compress_token))?.value || '';
		// const { totalElements, httpCode, payloadDto } = await fetch(
		// 	`${baseURL}${path}?page=${page}&size=${size}`,
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 		body: body,
		// 	}
		// );
		const { totalElements, httpCode, payloadDto } = await post(
			`${path}?page=${page}&size=${size}&sort=desc`,
			body,
			true
		);
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
};
