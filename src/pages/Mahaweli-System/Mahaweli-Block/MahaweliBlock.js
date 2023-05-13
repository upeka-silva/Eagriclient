import React, { useState } from "react";
import { Button } from "@mui/material";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import MahaweliBlockList from "./MahaweliBlockList";

const MahaweliBlock = () => {
  useUserAccessValidation();
  const navigate = useNavigate();

  const [selectMahaweliBlocks, setSelectedMahaweliBlocks] = useState([]);
  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleMahaweliBlockSelect = (component) => {
    setSelectedMahaweliBlocks((current = []) => {
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

  const selectAllMahaweliBlocks = (all = []) => {
    setSelectedMahaweliBlocks(all);
  };

  const resetSelectedMahaweliBlocks = () => {
    setSelectedMahaweliBlocks([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectMahaweliBlocks[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/mahaweli-structure/mahaweli-block-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectMahaweliBlocks[0] || {},
      },
    });
  };

  return (
    <div>
      <ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
        >
          <Button variant="contained" onClick={onCreate}>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>
        {selectMahaweliBlocks.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
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
        {selectMahaweliBlocks.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
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
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.MAHAWELI_BLOCK}`}
      >
        <MahaweliBlockList
          selectedRows={selectMahaweliBlocks}
          onRowSelect={toggleMahaweliBlockSelect}
          selectAll={selectAllMahaweliBlocks}
          unSelectAll={resetSelectedMahaweliBlocks}
        />
      </PermissionWrapper>
    </div>
  );
};

export default MahaweliBlock;
