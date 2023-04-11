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
        { field: 'provinceCode', headerName: 'Province Code', searchable: true },
        { field: 'provinceCode', headerName: 'Province Code', searchable: true },
        { field: 'provinceCode', headerName: 'Province Code', searchable: true },
        { field: 'provinceCode', headerName: 'Province Code', searchable: true },
        { field: 'name', headerName: 'Province Name', searchable: true },
    ];

    return (
        <CardWrapper>
            <DataTable
                dataRows={rows}
                columns={columns}
                // searchable
                resetSearchOnHide
                enableAdvanceSearch
                advanceSearchProps={{
                    provinceId: {
                        label: 'Province',
                        target: 'provinceId',
                        type: 'select',
                        multiple: true,
                        listTarget: 'id',
                        listLabels: ['name'],
                        dataList: [
                            { id: 1, name: "Province 1", provinceCode: 'P1' },
                            { id: 2, name: "Province 2", provinceCode: 'P1' },
                            { id: 3, name: "Province 3", provinceCode: 'P1' },
                            { id: 4, name: "Province 4", provinceCode: 'P1' },
                            { id: 5, name: "Province 5", provinceCode: 'P1' },
                            { id: 6, name: "Province 6", provinceCode: 'P1' },
                        ]
                    },
                    provinceCode: {
                        label: 'Province Code',
                        target: 'provinceCode',
                        type: 'text'
                    },
                    createdDate: {
                        label: 'Created At',
                        target: 'createdAt',
                        type: 'date'
                    },
                    checkboxes: {
                        type: 'checkbox',
                        options: [
                            { label: 'Option 1', target: 'option1' },
                            { label: 'Option 2', target: 'option2' },
                            { label: 'Option 3', target: 'option3' },
                            { label: 'Option 4', target: 'option4' },
                            { label: 'Option 5', target: 'option5' },
                        ]
                    },
                    radio: {
                        label: 'Options',
                        type: 'radio',
                        target: 'optionRadio',
                        options: [
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                            { label: 'Option 4', value: 'option4' },
                            { label: 'Option 5', value: 'option5' },
                        ]
                    },
                    districtId: {
                        label: 'District',
                        target: 'districtId',
                        type: 'searchable',
                        multiple: false,
                        listTarget: 'id',
                        listLabels: ['name', 'provinceId'],
                        listLabelJoint: ' - Province ',
                        dataList: [
                            { id: 1, name: "District 1", provinceId: 1 },
                            { id: 2, name: "District 2", provinceId: 2 },
                            { id: 3, name: "District 3", provinceId: 3 },
                            { id: 4, name: "District 4", provinceId: 4 },
                            { id: 5, name: "District 5", provinceId: 5 },
                            { id: 6, name: "District 6", provinceId: 6 },
                            { id: 7, name: "District 7", provinceId: 1 },
                            { id: 8, name: "District 8", provinceId: 2 },
                            { id: 9, name: "District 9", provinceId: 3 },
                            { id: 10, name: "District 10", provinceId: 4 },
                            { id: 11, name: "District 11", provinceId: 5 },
                            { id: 12, name: "District 12", provinceId: 6 },
                            { id: 13, name: "District 13", provinceId: 1 },
                            { id: 14, name: "District 14", provinceId: 2 },
                            { id: 15, name: "District 15", provinceId: 3 },
                            { id: 16, name: "District 16", provinceId: 4 },
                            { id: 17, name: "District 17", provinceId: 5 },
                            { id: 18, name: "District 18", provinceId: 6 },
                            { id: 19, name: "District 19", provinceId: 1 },
                            { id: 20, name: "District 20", provinceId: 2 },
                        ],
                        dependency: 'provinceId'
                    }
                }}
                advancedSearchComp={null}
                advancedSearchData={{}}
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
