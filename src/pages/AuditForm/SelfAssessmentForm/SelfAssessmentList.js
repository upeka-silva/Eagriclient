import React from 'react'
import { CardWrapper } from "../../../components/PageLayout/Card";
import { DataTable } from "../../../components/PageLayout/Table";
import SelfAssessment from "./SelfAssessment";

const SelfAssessmentList = ({
                             selectedRows = [],
                             onRowSelect = (_c) => {},
                             selectAll = (_list = []) => {},
                             unSelectAll = () => {},
                         }) => {
    const columns = [
        { field: "formName", headerName: "Name" },
        { field: "formDescription", headerName: "Description" },
    ];
    return (
<></>
    )
}

export default SelfAssessmentList