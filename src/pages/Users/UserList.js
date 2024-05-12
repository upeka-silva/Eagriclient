import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";
import { Fonts } from "../../utils/constants/Fonts";

const UsersList = ({
  selectedRows = [],
  dataUrl = "user-manage/users",
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "username", headerName: "User Name" },
    { field: ["firstName", "lastName"], joinString: " ", headerName: "Name" },
    { field: "genderClient", headerName: "Gender" },
    {
      field: ["userTypeDTO.userTypeId", "userTypeDTO.description"],
      headerName: "Type",
    },
    {
      field: ["userRoleList"],
      headerName: "Role",
    },
    {
      field: ["administrativeDivisionDTO.administrativeDivisionType"],
      headerName: "Division",
    },
    {
      field: ["divisionList"],
      headerName: "Filter Value",
    },
    { field: "address", headerName: "Address" },
    { field: "phone", headerName: "Phone No" },
    { field: "userLanguageClient", headerName: "Language" },
    { field: "enabled", headerName: "Active", type: "boolean" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <TableWrapper>
        <DataTable
          loadingTable
          dataEndPoint={dataUrl}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          selectAll={selectAll}
          onRowSelect={onRowSelect}
          unSelectAll={unSelectAll}
        />
      </TableWrapper>
    </div>
  );
};

export default UsersList;
