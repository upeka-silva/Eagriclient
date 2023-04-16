import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from '../../../components/PageLayout/Card';

const rows = [
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
  {
    id: 1,
    interProvinceCode: window.btoa(new Date().valueOf()),
    description: "Central province",
  },
];

const InterProvinceList = ({
  onView = (_province) => {},
  onEdit = (_province) => {},
  onDelete = (_province) => {},
  selectedInterProvinces = [],
  setSelectedInterProvinces,
  selectAllInterProvinces,
  removeSelectedInterProvinces,
}) => {
  const columns = [
    {
      // headerName: 'Actions',
      type: "actions",
      hidden: true,
      actions: [
        {
          action: "view",
          //   icon: <FileOpenIcon />,
          permissions: {
            // Permission Wrapper properties go here
          },
          callback: (record) => {
            onView(record);
          },
        },
        {
          action: "edit",
          permissions: {
            // Permission Wrapper properties go here
          },
          callback: (record) => {
            onEdit(record);
          },
        },
        {
          action: "custom",
          // icon: <FileOpenIcon />,
          permissions: {
            // Permission Wrapper properties go here
          },
          callback: (record) => {
            window.alert("Clicked Custom: " + JSON.stringify(record));
          },
        },
        {
          action: "delete",
          permissions: {
            // Permission Wrapper properties go here
          },
          callback: (record) => {
            onDelete(record);
          },
        },
      ],
    },
    // { field: 'id', headerName: 'ID', searchable: true },
    { field: "interProvinceCode", headerName: "Inter Province Code", searchable: true },
    { field: "description", headerName: "Description", searchable: true },
  ];

  return (
    <CardWrapper>
      <DataTable
        dataRows={rows}
        columns={columns}
        advancedSearchComp={null}
        advancedSearchData={{}}
        resetSearchOnHide
        enableAdvanceSearch
        advanceSearchProps={{
            interProvinceId: {
                label: 'Inter Province',
                target: 'interProvinceId',
                type: 'select',
                multiple: true,
                listTarget: 'id',
                listLabels: ['description'],
                dataList: [
                    { id: 1, description: "Central Province", interProvinceCode: 'P1' },
                    { id: 2, description: "Central Province", interProvinceCode: 'P1' },
                    { id: 3, description: "Central Province", interProvinceCode: 'P1' },
    
                ]
            },
            interProvinceCode: {
                label: 'Code',
                target: 'interProvinceCode',
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
        loaderType="circular"
        enableActionsOnContext
        selectable
        selectedRows={selectedInterProvinces}
        onRowSelect={setSelectedInterProvinces}
        selectAll={selectAllInterProvinces}
        unSelectAll={removeSelectedInterProvinces}
      ></DataTable>
    </CardWrapper>
  );
};

export default InterProvinceList;
