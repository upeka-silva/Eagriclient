import React from "react";
import { TableWrapper } from "../../components/PageLayout/TableWrapper";
import { DataTable } from "../../components/PageLayout/Table";

const UsersList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "email", headerName: "Email" },
    { field: ["firstName", "lastName"], joinString: " ", headerName: "Name" },
    { field: "genderClient", headerName: "Gender" },
    {
      field: ["userTypeDTO.userTypeId", "userTypeDTO.description"],
      headerName: "Type",
    },
    { field: "address", headerName: "Address" },
    { field: "phone", headerName: "Phone No" },
    { field: "userLanguageClient", headerName: "Language" },
  ];
  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"user-manage/users"}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowSelect={onRowSelect}
        unSelectAll={unSelectAll}
      />
    </TableWrapper>
  );
};

export default UsersList;
