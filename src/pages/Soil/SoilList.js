import React from "react";
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const rows = [
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
  {
    soilTypeId: 1,
    description: "Alluvial soils",
    texture: "data",
    pHLower: "121",
    pHUpper: "222",
    organicMatterContent: "data",
  },
];

const SoilList = ({
  onView = (_soil) => {},
  onEdit = (_soil) => {},
  onDelete = (_soil) => {},
  selectedSoils = [],
  setSelectedSoils,
  selectAllSoils,
  removeSoils,
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
    { field: "soilTypeId", headerName: "Soil Type Id", searchable: true },
    { field: "description", headerName: "Description", searchable: true },
    { field: "texture", headerName: "Texture", searchable: true },
    { field: "pHLower", headerName: "PH Lower", searchable: true },
    { field: "pHUpper", headerName: "PH Upper", searchable: true },
    {
      field: "organicMatterContent",
      headerName: "Organic Matter Content",
      searchable: true,
    },
    {
      field: "nitrogenPercentage",
      headerName: "Nitrogen Percentage",
      searchable: true,
    },
    {
      field: "phosphorusPercentage",
      headerName: "Phosphorus Percentage",
      searchable: true,
    },
    {
      field: "potassiumPercentage",
      headerName: "Potassium Percentage",
      searchable: true,
    },
    { field: "calcium", headerName: "Calcium", searchable: true },
    { field: "magnesium", headerName: "Magnesium", searchable: true },
    { field: "sulfur", headerName: "Sulfur", searchable: true },
    { field: "iron", headerName: "Iron", searchable: true },
    { field: "manganese", headerName: "Manganese", searchable: true },
    { field: "zinc", headerName: "Zinc", searchable: true },
    { field: "copper", headerName: "Copper", searchable: true },
    { field: "boron", headerName: "Boron", searchable: true },
    {
      field: "waterHoldingCapacity",
      headerName: "Water Holding Capacity",
      searchable: true,
    },
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
        selectedRows={selectedSoils}
        onRowSelect={setSelectedSoils}
        selectAll={selectAllSoils}
        unSelectAll={removeSoils}
      >

      </DataTable>
    </CardWrapper>
  );
};

export default SoilList;
