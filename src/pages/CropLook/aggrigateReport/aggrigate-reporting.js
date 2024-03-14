import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../../context/SnackBarContext";

import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import { TableWrapper } from "../../../components/PageLayout/TableWrapper";
import { DataTable } from "../../../components/PageLayout/Table";
import { get_CategoryList } from "../../../redux/actions/crop/cropVariety/action";
import CategoryReportTabel from "./categoryReportTable";

const AggrigateReport = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const [cropCategoryList, setCropCategoryList] = useState([]);

  useEffect(() => {
    get_CategoryList().then(({dataList = []}) => {
      console.log("crop list");
      console.log(dataList);
      setCropCategoryList(dataList);
    });
  }, []);

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
      <ListHeader title="Aggrigate Report" />
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.AGGREGATE_BI_WEEK_REPORT}`}
      >
        <TableWrapper>
          {cropCategoryList &&
            cropCategoryList.map((category) => (
              <div key={category.categoryId}>
                <h5>{category.categoryName}</h5>
                <CategoryReportTabel category={category} />
              </div>
            ))}
        </TableWrapper>
      </PermissionWrapper>
    </div>
  );
};

export default AggrigateReport;
