import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import CropSubCategoryList from "./CropSubCategoryList";

const CropSubCategory = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleSubCategorySelect = (component) => {
    setSelectSubCategory((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllSubCategories = (all = []) => {
    setSelectSubCategory(all);
  };

  const resetSelectedSubCategory = () => {
    setSelectSubCategory([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/sub-category-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/sub-category-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectSubCategory[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/sub-category-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectSubCategory[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper withoutPermissions>
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectSubCategory.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
          // >
          //   <Button
          //     variant="contained"
          //     color="secondary"
          //     onClick={onEdit}
          //     sx={{ ml: "8px" }}
          //   >
          //     {DEF_ACTIONS.EDIT}
          //   </Button>
          // </PermissionWrapper>
          <PermissionWrapper withoutPermissions>
            <Button
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.EDIT}
            </Button>
          </PermissionWrapper>
        )}
          {selectSubCategory.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_SUB_CATEGORY}`}
          // >
          //   <Button
          //     variant="contained"
          //     color="info"
          //     onClick={onView}
          //     sx={{ ml: "8px" }}
          //   >
          //     {DEF_ACTIONS.VIEW}
          //   </Button>
          // </PermissionWrapper>
          <PermissionWrapper withoutPermissions>
            <Button
              variant="contained"
              color="info"
              onClick={onView}
              sx={{ ml: "8px" }}
            >
              {DEF_ACTIONS.VIEW}
            </Button>
          </PermissionWrapper>
        )}
      </ActionWrapper>
       {/* <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE}`}
      >
        <ProvinceList
          selectedRows={selectedProvinces}
          onRowSelect={toggleProvinceSelect}
          selectAll={selectAllProvinces}
          unSelectAll={resetSelectedProvinces}
        />
      </PermissionWrapper> */}
      <PermissionWrapper withoutPermissions>
        <CropSubCategoryList
          selectedRows={selectSubCategory}
          onRowSelect={toggleSubCategorySelect}
          selectAll={selectAllSubCategories}
          unSelectAll={resetSelectedSubCategory}
        />
      </PermissionWrapper>
    </div>
  );
};

export default CropSubCategory;
