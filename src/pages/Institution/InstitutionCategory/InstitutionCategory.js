import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useUserAccessValidation } from "../../../hooks/authentication";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import InstitutionCategoryList from "./InstitutionCategoryList";

const InstitutionCategory = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectInstitutionCat, setSelectInstitutionCat] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleInstitutionCatSelect = (component) => {
    setSelectInstitutionCat((current = []) => {
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

  const selectAllInstitutionCat = (all = []) => {
    setSelectInstitutionCat(all);
  };

  const resetSelectedInstitutionCat = () => {
    setSelectInstitutionCat([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/institution/institution-category-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/institution/institution-category-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectInstitutionCat[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/institution/institution-category-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectInstitutionCat[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.INSTITUTION_CATEGORY}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectInstitutionCat.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.INSTITUTION_CATEGORY}`}
          >
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
         {selectInstitutionCat.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.INSTITUTION_CATEGORY}`}
          >
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
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.INSTITUTION_CATEGORY}`}
      >
        <InstitutionCategoryList
          selectedRows={selectInstitutionCat}
          onRowSelect={toggleInstitutionCatSelect}
          selectAll={selectAllInstitutionCat}
          unSelectAll={resetSelectedInstitutionCat}
        />
      </PermissionWrapper>
    </div>
  );
};

export default InstitutionCategory;
