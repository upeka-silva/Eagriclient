import React from 'react'
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";

const CommonAuditList = ({
                                selectedRows = [],
                                onRowSelect = (_c) => {},
                                selectAll = (_list = []) => {},
                                unSelectAll = () => {},
                            }) => {
    const columns = [
        { field: "formName", headerName: "Name" },
        { field: "formDescription", headerName: "Description" },
        { field: "category", headerName: "Category" },
        { field: "subcategory", headerName: "Sub Category" },
    ];
    return (
        <CardWrapper>
            <DataTable
                loadingTable
                dataEndPoint={"question-form-template"}
                columns={columns}
                selectable
                selectedRows={selectedRows}
                selectAll={selectAll}
                onRowSelect={onRowSelect}
                unSelectAll={unSelectAll}
            />
        </CardWrapper>
    )
}

export default CommonAuditList