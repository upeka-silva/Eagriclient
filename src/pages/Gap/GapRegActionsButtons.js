import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';
import { useAuthContext } from '../../context/AuthContext';

const GapRequestActionsButtons = ({ role, gapReqStatus, setOpenApproveDialog, existingAuditores }) => {

  const { getUserPermissionStateByAuthority } = useAuthContext();

  const hasPermission = (action, component) => {
    const permission = `${action}_${component}`;
    return getUserPermissionStateByAuthority(permission) || false;
  };

  const isButtonVisible = () => {
    if (hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.GAP_BY_DD)) {
      if (gapReqStatus.lblState === "SUBMITTED") {
        return true;
      }
    }
    if (hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.GAP_BY_SCS)) {
      if (gapReqStatus.lblState === "APPROVED_BY_DD" || gapReqStatus.lblState === "EXTERNAL_AUDITOR_SUBMITTED") {
        return true;
      }
    }
    if (hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.GAP_BY_MAIN_SCS)) {
      if (gapReqStatus.lblState === "SCS_REGIONAL_OFFICER_APPROVE") {
        return true;
      }
    }
    if (hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.EXTERNAL_AUDIT)) {
      if (gapReqStatus.lblState === "ASSIGN_AUDITORS") {
        return true;
      }
    }
    return false;
  };

  return isButtonVisible() ? (
    <ButtonGroup>
      {/* Button for approval */}
      {
        hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.GAP_BY_SCS) && gapReqStatus.lblState === "APPROVED_BY_DD" ? null :
          (<Button
            onClick={() => {
              setOpenApproveDialog({ open: true, option: 'approve' });
            }}
            color="success"
            variant="outlined"
            size="small"
            sx={{ marginLeft: '10px' }}
          >
            {hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.EXTERNAL_AUDIT) && gapReqStatus.lblState === "ASSIGN_AUDITORS" ? "SUBMIT" :"APPROVE"}
          </Button>)
      }

      {/* Button for rejection */}
      {
        hasPermission(DEF_ACTIONS.APPROVE, DEF_COMPONENTS.EXTERNAL_AUDIT) && gapReqStatus.lblState === "ASSIGN_AUDITORS" ? null : (
          <Button
            onClick={() => {
              setOpenApproveDialog({ open: true, option: 'reject' });
            }}
            color="error"
            variant="outlined"
            size="small"
            sx={{ marginLeft: '10px' }}
          >
            REJECT
          </Button>
        )
      }

    </ButtonGroup>
  ) : null;
}

export default GapRequestActionsButtons;

