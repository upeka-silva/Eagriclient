import React from "react";
import { DataTable } from "../../../components/PageLayout/Table";
import { CardWrapper } from "../../../components/PageLayout/Card";

const rows = [
  {
    id: 1,
    regionId: 123,
    description: "AI region",
    parentType: "Province",
    parentValue: "Province",
    ascRegionId: 1,
  },
];

const AIList = ({
  onView = (_ai) => {},
  onEdit = (_ai) => {},
  onDelete = (_ai) => {},
  selectedAiGroup = [],
  setSelectedAiGroup,
  selectAiGroup,
  removeSelectedAiGroup,
}) => {
  const columns = [
    {
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
    { field: "id", headerName: "ID", searchable: false },
    { field: "regionId", headerName: "Region ID", searchable: true },
    { field: "description", headerName: "Description", searchable: true },
    { field: "parentType", headerName: "Parent Type", searchable: true },
    { field: "parentValue", headerName: "Parent Value", searchable: true },
    { field: "ascRegionId", headerName: "ASC Region ID", searchable: true },
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
        selectedRows={selectedAiGroup}
        onRowSelect={setSelectedAiGroup}
        selectAll={selectAiGroup}
        unSelectAll={removeSelectedAiGroup}
      />
    </CardWrapper>
  );
};

export default AIList;
