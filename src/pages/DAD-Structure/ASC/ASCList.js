import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const rows = [
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
  {
    id: 1,
    ascCode: window.btoa(new Date().valueOf()),
    ascName: "ASC",
    districtId: "1234",
  },
];

const ASCList = ({
  onView = (_asc) => {},
  onEdit = (_asc) => {},
  onDelete = (_asc) => {},
  selectedAscGroup = [],
  setSelectedAscGroup,
  selectAscGroup,
  removeSelectedAscGroup,
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
    {
      field: "ascCode",
      headerName: "ASC Code",
      searchable: true,
    },
    { field: "ascName", headerName: "ASC Name", searchable: true },
    { field: "districtId", headerName: "District Id", searchable: true },
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
      loaderType="circular"
      enableActionsOnContext
      selectable
      selectedRows={selectedAscGroup}
      onRowSelect={setSelectedAscGroup}
      selectAll={selectAscGroup}
      unSelectAll={removeSelectedAscGroup}
      />
    </CardWrapper>
  );
};

export default ASCList;
