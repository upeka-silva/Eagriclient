import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';

const GapRequestActionsButtons = ({ role, gapReqStatus, setOpenApproveDialog, existingAuditores }) => {


  console.log(gapReqStatus.lblState)

  const roleStateMap = {
    DD_OFFICER: ['SUBMITTED'],
    SCS_REGINAL_OFFICER: ['APPROVED_BY_DD', 'EXTERNAL_AUDITOR_SUBMITTED'],
    GAP_EXTERNAL_AUDITOR: ['ASSIGN_AUDITORS', 'APPROVED_BY_DD'],
    MAIN_SCS_REGIONAL_OFFICER: ['SCS_REGIONAL_OFFICER_APPROVE']
  };

  const isButtonVisible = () => {
    const validStates = roleStateMap[role];
    return validStates && validStates.includes(gapReqStatus.lblState);
  };

  return isButtonVisible() ? (
    <div>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.APPROVE}_${role === 'DD_OFFICER' ? DEF_COMPONENTS.GAP_BY_DD :
          role === 'SCS_REGINAL_OFFICER' ? DEF_COMPONENTS.GAP_BY_SCS :
            role === 'GAP_EXTERNAL_AUDITOR' ? DEF_COMPONENTS.EXTERNAL_AUDIT :
              DEF_COMPONENTS.GAP_BY_MAIN_SCS}`}
      >
        <ButtonGroup>
          {
            role === "SCS_REGINAL_OFFICER" && gapReqStatus.lblState === "APPROVED_BY_DD" && existingAuditores.length != 0 ||
            role === "SCS_REGINAL_OFFICER" && gapReqStatus.lblState === "APPROVED_BY_DD"
            ? null : (
              <Button
                onClick={() => {
                  setOpenApproveDialog({ open: true, option: 'approve' });
                }}
                color="success"
                variant="outlined"
                size="small"
                sx={{ marginLeft: '10px' }}
              >
                { role === 'GAP_EXTERNAL_AUDITOR' &&  gapReqStatus.lblState === "ASSIGN_AUDITORS" ? "SUBMIT" : "APPROVE" }
              </Button>
            )
          }
            
          {
            role === 'GAP_EXTERNAL_AUDITOR' &&  gapReqStatus.lblState === "ASSIGN_AUDITORS" ? null : (
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
      </PermissionWrapper>
    </div>
  ) : null;
}

export default GapRequestActionsButtons;

