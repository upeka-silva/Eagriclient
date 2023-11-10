import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PermissionList from "./PermissionsList";
import RoleAccordion from "./RoleAccordion";
import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { fetchAllRoles } from "../../../redux/actions/permission/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { updateRolePermissions } from "../../../redux/actions/app_settings/roles/action";
import BackToList from "../../../components/BackToList/BackToList";
import { FormHeader } from "../../../components/FormLayout/FormHeader";

export default function PermissionsByRole() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const role = { id: state.data[0].id, code: state.data[0].code };
  const key = state.data[0].id;

  const [formData, setFormData] = useState(state.data[0].permissionDTOs);

  const { addSnackBar } = useSnackBars();

  const onError = (message, callback = () => {}) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
    callback();
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully Updated",
    });
  };

  const setRoleFormData = (roleFormData) => {
    setFormData(roleFormData);
    console.log(roleFormData);
  };

  const submit = async () => {
    const roleDTO = {
      id: state.data[0].id,
      name: state.data[0].name,
      code: state.data[0].code,
      permissionDTOs: formData,
    };
    console.log(formData);

    try {
      if (roleDTO?.id) {
        await updateRolePermissions(roleDTO, onSuccess, onError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigate("/app-settings/permissions");
  };

  return (
    <div style={{ overflowY: "scroll" }}>
      <BackToList goBack={goBack} />
      <FormHeader>Permissions Settings</FormHeader>
      <ActionWrapper isLeft>
        <Box sx={{ height: "20px", marginBottom: "10px", marginLeft: "10px" }}>
          <Button
            onClick={submit}
            size="small"
            variant="outlined"
            color="success"
          >
            Save
          </Button>
        </Box>
      </ActionWrapper>

      <PermissionWrapper withoutPermissions>
        <RoleAccordion
          role={role}
          key={key}
          roleFormData={formData}
          setRoleFormData={setRoleFormData}
        />
      </PermissionWrapper>
    </div>
  );
}
