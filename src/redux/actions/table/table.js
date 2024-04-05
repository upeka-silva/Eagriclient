import { get, post } from '../../../services/api/index';
export const get_DataList = async (path, page = 0, size = 10,order="asc", target="id") => {
	try {
		const queryParams = `page=${page}&size=${size}&sort=${order}&sortCol=${target}`;
        const url = path.includes('?') ? `${path}&${queryParams}` : `${path}?${queryParams}`;
		const { totalElements, httpCode, payloadDto } = await get(url, true);
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
export const get_DataListById = async (path) => {
	console.log(path)
	try {
		console.log("try")
		const { totalElements, httpCode, payload } = await get(
			`${path}`,
			true
		);
		if (httpCode === '200 OK') {
			return {
				dataList: payload,
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

export const post_DataList = async (path, page = 0, size = 10, body = {},order,target="id") => {
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
			`${path}?page=${page}&size=${size}&sort=${order}&sortCol=${target}`,
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
