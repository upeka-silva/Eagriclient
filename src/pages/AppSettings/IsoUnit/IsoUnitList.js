import { DataTable } from "../../../components/PageLayout/Table";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";

const IsoUnitList = ({
  selectedRows = [],
  onRowSelect = (_c) => {},
  selectAll = (_list = []) => {},
  unSelectAll = () => {},
}) => {
  const columns = [
    { field: "unitCode", headerName: "Unit Code" },
    { field: "description", headerName: "Description" },
    { field: "baseUnit", headerName: "Base Unit" },
    { field: "multiFactor", headerName: "Multi Factor" },
    { field: "divFactor", headerName: "Div Factor" },
    { field: "tenPower", headerName: "10 To The Power" },
  ];
  

  return (
    <TableWrapper>
      <DataTable
        loadingTable
        dataEndPoint={"iso-units"}
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

export default IsoUnitList;
