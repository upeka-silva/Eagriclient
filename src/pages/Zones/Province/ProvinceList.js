import React from 'react';
import { CardWrapper } from '../../../components/PageLayout/Card';
import { DataTable } from '../../../components/PageLayout/Table';

const ProvinceList = ({
    selectedRows = [],
    onRowSelect = (_c) => { },
    selectAll = (_list = []) => { },
    unSelectAll = () => { },
}) => {

    const columns = [
        { field: 'code', headerName: 'Province Code' },
        { field: 'name', headerName: 'Province Name' },
    ];
    return (
        <CardWrapper>
            <DataTable
                 loadingTable
                 dataEndPoint={'geo-data/provinces'}
                 columns={columns}
                 selectable
                 selectedRows={selectedRows}
                 selectAll={selectAll}
                 onRowSelect={onRowSelect}
                 unSelectAll={unSelectAll}
                 />
        </CardWrapper>
    );
}

export default ProvinceList;
