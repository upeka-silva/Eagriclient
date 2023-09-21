import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PermissionList from "./PermissionsList";
import RoleAccordion from "./RoleAccordion";
import { Paper } from "@mui/material";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { fetchAllRoles } from "../../../redux/actions/permission/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";

export default function PermissionsByRole() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const role = { id: state.data[0].id, code: state.data[0].code };
  const key = state.data[0].id;

  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(state.data[0].permissionDTOs);

  const { addSnackBar } = useSnackBars();

  const onError = (message, callback = () => {}) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
    callback();
  };

  const setRoleFormData = (roleFormData) => {
    setFormData(roleFormData);
    console.log(roleFormData);
    console.log("Add updated object to data array");
  };

  return (
    <div style={{ overflowY: "scroll" }}>
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
