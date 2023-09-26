import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ComponentActionList from "./ComponentActionList";
import styled from "styled-components";
import theme from "../../../utils/theme/theme.json";

const RoleAccordion = ({ role, key, roleFormData, setRoleFormData }) => {
  const { roleId, code } = role;

  // const [formData,setFormData] = useState(roleFormData)

  const [expanded, setExpanded] = useState(true);

  const handleChange = (p, state) => {
    let r = {
      roleId: roleId,
      permissions: [...(roleFormData || [])],
    };

    if (state) {
      r.permissions.push(p);
      // console.log(r);
      console.log(state);
    } else {
      let i = (r?.permissions || []).findIndex((r) => r?.id === p.id);
      r.permissions.splice(i, 1);
      console.log(state);
    }
    // console.log(component + "/" + action + "/" + state);
    console.log(r.permissions)
    setRoleFormData(r.permissions);
  };

  return (
    <CustomAccordion
      key={key}
      expanded={expanded}
      onChange={() => setExpanded((current) => !current)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="#FFF" />}
        size="small"
      >
        <Typography variant="inherit">{code || "ROLE_CODE"}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <ComponentActionList
          roleId={roleId}
          rolePermissions={roleFormData || []}
          setRolePermission={handleChange}
        />
      </AccordionDetails>
    </CustomAccordion>
  );
};

export default RoleAccordion;

const CustomAccordion = styled(Accordion)`
  margin-bottom: 10px;

  & .MuiAccordionSummary-root {
    background: ${theme.coreColors.primary} !important;
    color: #000 !important;
    min-height: 40px !important;
    max-height: 45px !important;
  }

  & .MuiAccordionSummary-content {
    font-weight: bold !important;
  }

  & .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root {
    color: #000 !important;
  }
`;
