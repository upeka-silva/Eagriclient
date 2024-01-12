import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper'; 
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';

const GapRequestActionsButtons = ({ role, gapReqStatus, setGapStatusToSave, setOpenApproveDialog }) => {
  
  const statusForRole = {
    DD_OFFICER: ['APPROVED_BY_DD', 'REJECTED_BY_DD'],
    SCS_REGINAL_OFFICER: ['SCS_REGIONAL_OFFICER_APPROVE_AUDIT', 'SCS_REGIONAL_OFFICER_REJECT_AUDIT'],
    EXTERNAL_AUDITOR: ['EXTERNAL_AUDIT_COMPLETED']
  };
  
  const roleStateMap = {
    DD_OFFICER: ['SUBMITTED', 'APPROVED_BY_DD', 'REJECTED_BY_DD'],
    SCS_REGINAL_OFFICER: ['APPROVED_BY_DD', 'EXTERNAL_AUDIT_COMPLETED'],
    EXTERNAL_AUDITOR: ['ASSIGN_AUDITORS'],
    MAIN_SCS_OFFICER: ['SCS_REGIONAL_OFFICER_APPROVE_AUDIT']
  };
  

  const isButtonVisible = () => {
    const validStates = roleStateMap[role];
    return validStates && gapReqStatus.lblState === "SUBMITTED";
  };

  console.log(gapReqStatus)

  return isButtonVisible() ? (
    <div>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.APPROVE}_${role === 'DD_OFFICER' ? DEF_COMPONENTS.GAP_BY_DD : 
                                              role === 'SCS_REGINAL_OFFICER' ? DEF_COMPONENTS.GAP_BY_SCS : 
                                              DEF_COMPONENTS.GAP_BY_MAIN_SCS}`}
      >
        <ButtonGroup>
        <Button
          onClick={() => {
            setGapStatusToSave(
              role === 'DD_OFFICER' ? statusForRole['DD_OFFICER'][0] : 
              role === 'SCS_REGINAL_OFFICER' ? statusForRole['SCS_REGINAL_OFFICER'][0]: 
              'APPROVED_BY_MAIN_SCS'              
            );
            setOpenApproveDialog({ open: true, option: 'approve' });
          }}
          color="success"
          variant="outlined"
          size="small"
          sx={{ marginLeft: '10px' }}
        >
          APPROVE
        </Button>

        <Button
          onClick={() => {
            setGapStatusToSave(
              role === 'DD_OFFICER' ? statusForRole['DD_OFFICER'][1] : 
              role === 'SCS_REGINAL_OFFICER' ? statusForRole['SCS_REGINAL_OFFICER'][1]:
              'REJECTED_BY_MAIN_SCS'
            );
            setOpenApproveDialog({ open: true, option: 'reject' });
          }}
          color="error"
          variant="outlined"
          size="small"
          sx={{ marginLeft: '10px' }}
        >
          REJECT
        </Button>
        </ButtonGroup>
      </PermissionWrapper>
    </div>
  ) : null;
};

export default GapRequestActionsButtons;

