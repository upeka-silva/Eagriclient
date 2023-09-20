import React, { useState } from 'react';
import {
    FormControlLabel,
    Grid, FormGroup, Checkbox,
} from "@mui/material";
import { FieldName } from '../../components/FormLayout/FieldName';

const RoleSelection = ({ roles, selectedRoles, onRolesChange }) => {
  const numberOfColumns = 5; // Number of columns you want to divide the roles into
  const columnSize = Math.ceil(roles.length / numberOfColumns);

  const handleRoleChange = (role) => {
    const roleDTO = {"id": role};
    onRolesChange(roleDTO);
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
                        onChange={() => handleRoleChange(role.id)}
                        name={role.name}
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