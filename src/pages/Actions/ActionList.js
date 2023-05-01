import React from 'react';
import { CardWrapper } from '../../components/PageLayout/Card';
import { DataTable } from '../../components/PageLayout/Table';

const ActionList = () => {

    const columns = [
        { field: 'code', headerName: 'Code' },
        { field: 'name', headerName: 'Name' },
        { field: 'createdDate', headerName: 'Created Date', type: 'datetime' },
    ];

    return (
        <CardWrapper>
            <DataTable
                dataEndPoint={'actions'}
                columns={columns}
            />
        </CardWrapper>
    );
}

export default ActionList;
