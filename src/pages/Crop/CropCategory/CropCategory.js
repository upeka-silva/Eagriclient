import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CropCategoryList from "./CropCategoryList"
import { useUserAccessValidation } from '../../../hooks/authentication';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../../utils/constants/permission';
import { ActionWrapper } from '../../../components/PageLayout/ActionWrapper';
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";

const CropCategory = () => {

  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectCategory, setSelectCategory] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleCategorySelect = (component) => {
    setSelectCategory((current = []) => {
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

  const selectAllCategories= (all = []) => {
    setSelectCategory(all);
  };

  const resetSelectedCategory = () => {
    setSelectCategory([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/crop/category-form", { state: { action: DEF_ACTIONS.ADD } });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/crop/category-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectCategory[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/crop/category-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectCategory[0] || {},
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
        {selectCategory.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_CATEGORY}`}
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
           {selectCategory.length === 1 && (
          // <PermissionWrapper
          //   permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_CATEGORY}`}
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
        <CropCategoryList
          selectedRows={selectCategory}
          onRowSelect={toggleCategorySelect}
          selectAll={selectAllCategories}
          unSelectAll={resetSelectedCategory}
        />
      </PermissionWrapper>
    </div>
  )
}

export default CropCategory