import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Chip, Grid } from "@mui/material";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import DamageAddModal from "./damage-add";
import { getDbFieldName } from "../../../utils/appUtils";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";

const BiWeeklySingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode,
  status,
  configFields,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("inside BiWeeklySingleInput comp ------------>");
    console.log(varietyTarget);
  }, [varietyTarget]);

  const handleAddDamage = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const extentHandler = (cropIndex, varietyIndex, field, value) => {
    targetedExtentHandler(cropIndex, varietyIndex, field, value);
  };

  // This will remove `extent` prefix form field
  const removeExtent = (field) => {
    let prefix = "Extent ";

    // Check if the string starts with the prefix
    if (field.startsWith(prefix)) {
      // Remove the prefix
      let result = field.substring(prefix.length) + " (Ha)";
      return result;
    } else {
      return field;
    }
  };
  console.log({ mode });
  return (
    <>
      <Grid container spacing={1} sx={{ paddingTop: "20px" }}>
        <Grid item xs={2}>
          <Chip
            avatar={
              <Avatar
                alt={varietyTarget.varietyName}
                src={varietyTarget.imageUrl}
                sx={{ mr: 1 }}
              />
            }
            label={varietyTarget.varietyName}
            variant="outlined"
            sx={{
              mt: "4px",
              bgcolor: "#A7E99C",
              width: "400px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            {configFields.map((field, i) => (
              <Grid item xs={2}>
                <TextField
                  type="number"
                  disabled={mode === DEF_ACTIONS.VIEW || status === "CLOSE"}
                  variant="outlined"
                  id={`input_${varietyTarget.varietyName}_${i}`}
                  label={removeExtent(field)}
                  value={varietyTarget[getDbFieldName(field)]}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (!isNaN(inputValue) && inputValue >= 0) {
                      // Check if the input is a valid number and not negative
                      extentHandler(
                        cropIndex,
                        varietyIndex,
                        getDbFieldName(field),
                        inputValue
                      );
                    }
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                    },
                    input: { textAlign: "right" },
                  }}
                  size="small"
                />
              </Grid>
            ))}

            <Grid item xs={2}>
              <TextField
                type="number"
                disabled={true}
                variant="outlined"
                id={`input_${varietyTarget?.varietyName}_${varietyTarget?.id}total`}
                label="Total Extent (Ha)"
                value={varietyTarget["totalExtent"] || 0}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                  input: { textAlign: "right" },
                  color: "green",
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#33b858",
                    borderRadius: "8px",
                  },
                  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#33b858",
                    borderWidth: "2px",
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: "#33b858", // replace '#yourColor' with your desired color
                  },
                }}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            {varietyTarget?.id ? (
              <Grid item xs={12}>
                {(varietyTarget?.damageExtents &&
                  varietyTarget?.damageExtents[0]?.id &&
                  mode === DEF_ACTIONS.VIEW) ||
                mode === DEF_ACTIONS.EDIT ||
                (mode === DEF_ACTIONS.ADD && varietyTarget?.id) ? (
                  mode === DEF_ACTIONS.VIEW ? (
                    <PermissionWrapper
                      permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.BI_WEEK_DAMAGE_EXTENT}`}
                    >
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        onClick={handleAddDamage}
                        sx={{ marginTop: "10px" }}
                      >
                        View Damage
                      </Button>
                    </PermissionWrapper>
                  ) : (
                    <PermissionWrapper
                      permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.BI_WEEK_DAMAGE_EXTENT}`}
                    >
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        onClick={handleAddDamage}
                        sx={{ marginTop: "10px" }}
                      >
                        Add Damage
                      </Button>
                    </PermissionWrapper>
                  )
                ) : (
                  <PermissionWrapper
                    permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.BI_WEEK_DAMAGE_EXTENT}`}
                  >
                    <Button
                      disabled={true}
                      variant="outlined"
                      color="success"
                      size="small"
                      sx={{ marginTop: "10px" }}
                    >
                      Add Damage
                    </Button>
                  </PermissionWrapper>
                )}
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>

      {varietyTarget?.id && isModalOpen ? (
        <DamageAddModal
          isModalOpen={isModalOpen}
          handleModalCancel={handleModalCancel}
          mode={mode}
          variety={varietyTarget}
        />
      ) : null}
    </>
  );
};

export default BiWeeklySingleInput;
