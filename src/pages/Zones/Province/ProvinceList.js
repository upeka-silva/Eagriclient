import React, { useEffect, useState } from 'react';
import { CardWrapper } from '../../../components/PageLayout/Card';
import { DataTable } from '../../../components/PageLayout/Table';
import { get, post } from '../../../services/api';

const ProvinceList = ({
	selectedRows = [],
	onRowSelect = (_c) => {},
	selectAll = (_list = []) => {},
	unSelectAll = () => {},
	advancedSearchData = {},
}) => {
	const [data, setData] = useState([]);

	const columns = [
		{ field: 'code', headerName: 'Code' },
		{ field: 'name', headerName: 'Description' },
	];

	// useEffect(() => {
	// 	getData();
	// }, []);

	// const getData = async () => {
	// 	try {
	// 		let resposne = await post(
	// 			'geo-data/provinces',
	// 			{
	// 				code: '<>',
	// 				name: '<>',
	// 			},
	// 			true
	// 		);
	// 		console.log(resposne);
	// 	} catch (error) {}
	// };

	return (
		<CardWrapper>
			<DataTable
				loadingTable
				dataRows={data}
				dataEndPoint={'geo-data/provinces'}
				filterEndPoint={'geo-data/provinces/filter-provinces'}
				columns={columns}
				selectable
				selectedRows={selectedRows}
				selectAll={selectAll}
				onRowSelect={onRowSelect}
				unSelectAll={unSelectAll}
				advancedSearchData={advancedSearchData}
			/>
		</CardWrapper>
	);
};

export default ProvinceList;
