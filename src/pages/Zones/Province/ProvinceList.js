import React from 'react';
import { CardWrapper } from '../../../components/Page Layout/Card';
import { DataTable } from '../../../components/Page Layout/Table';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const rows = [
    { id: 1, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 1" },
    { id: 2, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 2" },
    { id: 3, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 3" },
    { id: 4, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 4" },
    { id: 5, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 5" },
    { id: 6, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 6" },
    { id: 7, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 7" },
    { id: 8, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 8" },
    { id: 9, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 9" },
    { id: 10, provinceCode: window.btoa((new Date()).valueOf()), name: "Province 10" },
];


const ProvinceList = ({
    onView = (_province) => { },
    onEdit = (_province) => { },
    onDelete = (_province) => { },
    selectedProvinces = [],
    setSelectedProvinces,
    selectAllProvinces,
    removeSelectedProvinces,
}) => {

    const columns = [
        {
            // headerName: 'Actions',
            type: 'actions',
            hidden: true,
            actions: [
                {
                    action: 'view',
                    icon: <FileOpenIcon />,
                    permissions: {
                        // Permission Wrapper properties go here
                    },
                    callback: (record) => {
                        onView(record)
                    }
                },
                {
                    action: 'edit',
                    permissions: {
                        // Permission Wrapper properties go here
                    },
                    callback: (record) => {
                        onEdit(record)
                    }
                },
                {
                    action: 'custom',
                    // icon: <FileOpenIcon />,
                    permissions: {
                        // Permission Wrapper properties go here
                    },
                    callback: (record) => {
                        window.alert("Clicked Custom: " + JSON.stringify(record))
                    }
                },
                {
                    action: 'delete',
                    permissions: {
                        // Permission Wrapper properties go here
                    },
                    callback: (record) => {
                        onDelete(record)
                    }
                }
            ]
        },
        // { field: 'id', headerName: 'ID', searchable: true },
        { field: 'provinceCode', headerName: 'Province Code', searchable: true },
        { field: 'name', headerName: 'Province Name', searchable: true },
    ];

    return (
        <CardWrapper>
            <DataTable
                dataRows={rows}
                columns={columns}
                searchable
                resetSearchOnHide
                // loadingTable
                loaderType="circular"
                enableActionsOnContext
                selectable
                selectedRows={selectedProvinces}
                onRowSelect={setSelectedProvinces}
                selectAll={selectAllProvinces}
                unSelectAll={removeSelectedProvinces}
            />
        </CardWrapper>
    );
}

export default ProvinceList;
