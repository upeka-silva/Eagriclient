import React from 'react'
import { CardWrapper } from "../../components/PageLayout/Card";
import { DataTable } from "../../components/PageLayout/Table";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const CommonAuditList = ({
                                selectedRows = [],
                                onRowSelect = (_c) => {},
                                selectAll = (_list = []) => {},
                                unSelectAll = () => {},
                             pathParm = ''
                            }) => {
    const dateAdapter = new AdapterDayjs();
    const columns = [
        {field: "formName", headerName: "Name"},
        {field: "formDescription", headerName: "Description"},
        {field: "category", headerName: "Category"},
        {field: "subcategory", headerName: "Sub Category"},
        {
            field: "activeFrom",
            headerName: "Active From",
            valueGetter: (params) => dateAdapter.date(params?.row?.firstName)
        }

    ];
    return (
            <DataTable
                loadingTable
                dataEndPoint={"question-form-template/all/" + pathParm}
                columns={columns}
                selectable
                selectedRows={selectedRows}
                selectAll={selectAll}
                onRowSelect={onRowSelect}
                unSelectAll={unSelectAll}
            />
    )
}

export default CommonAuditList