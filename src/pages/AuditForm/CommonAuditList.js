import React from 'react'
import {DataTable} from "../../components/PageLayout/Table";

const CommonAuditList = ({
                             selectedRows = [],
                             onRowSelect = (_c) => {
                             },
                             selectAll = (_list = []) => {
                             },
                             unSelectAll = () => {
                             },
                             pathParm = ''
                         }) => {
    let columns = [];

    if (pathParm != 'SELF_ASSESSMENT') {
        columns = [
            {field: "formName", headerName: "Name"},
            {field: "formDescription", headerName: "Description"},
            {field: "category", headerName: "Category"},
            {field: "subcategory", headerName: "Sub Category"},
            {field: "activeFrom", headerName: "Active From"}
        ];
    } else {
        columns = [
            {field: "formName", headerName: "Name"},
            {field: "formDescription", headerName: "Description"},
            {field: "activeFrom", headerName: "Active From"}
        ];
    }


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