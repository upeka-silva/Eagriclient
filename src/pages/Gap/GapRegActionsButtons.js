import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import PermissionWrapper from '../../components/PermissionWrapper/PermissionWrapper';
import { DEF_ACTIONS, DEF_COMPONENTS } from '../../utils/constants/permission';

const GapRequestActionsButtons = ({ role, gapReqStatus, setOpenApproveDialog }) => {

  const roleStateMap = {
    DD_OFFICER: ['SUBMITTED', 'APPROVED_BY_DD', 'REJECTED_BY_DD'],
    SCS_REGINAL_OFFICER: ['APPROVED_BY_DD', 'EXTERNAL_AUDITOR_APPROVE'],
    GAP_EXTERNAL_AUDITOR: ['ASSIGN_AUDITORS', 'EXTERNAL_AUDITOR_APPROVE', 'APPROVED_BY_DD'],
    MAIN_SCS_OFFICER: ['SCS_REGIONAL_OFFICER_APPROVE']
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
          <Button
            onClick={() => {
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
}

export default GapRequestActionsButtons;

