import React, { useState } from 'react';
import {
    FormControlLabel,
    Grid, FormGroup, Checkbox,
} from "@mui/material";
import { FieldName } from '../../components/FormLayout/FieldName';
import { DEF_ACTIONS } from '../../utils/constants/permission';

const RoleSelection = ({ roles, selectedRoles, onRolesChange, action }) => {
  const numberOfColumns = 4; // Number of columns you want to divide the roles into
  const columnSize = Math.ceil(roles.length / numberOfColumns);
  const handleRoleChange = (roleId) => {
    onRolesChange(roleId);
  };

  return (
    <div>
      <FieldName>Select user roles</FieldName>
      <Grid container spacing={3}>
        {[...Array(numberOfColumns)].map((_, columnIndex) => (
          <Grid item lg={12 / numberOfColumns} key={columnIndex}>
            <FormGroup>
              {roles
                .slice(columnIndex * columnSize, (columnIndex + 1) * columnSize)
                .map((role) => (
                    <FormControlLabel
                    key={role.id}
                    control={
                    <Checkbox
                        checked={selectedRoles?.some(selectedRole => selectedRole?.roleDTO?.id === role.id)}
                        onChange={() => handleRoleChange(role.id)}
                        name={role.name}
                        disabled={action === DEF_ACTIONS.VIEW}
                    />
                    }
                    label={role.name}
                    />
                ))}
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoleSelection;