import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { CancelOutlined, CheckRounded } from "@mui/icons-material";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import DamageAddModal from "./damage-add";
import { CROP_LOOK_FIELD } from "../../../utils/constants/cropLookFields";

const BiWeeklySingleInput = ({
  varietyTarget,
  cropIndex,
  varietyIndex,
  targetedExtentHandler,
  mode,
  configFields,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalExtent, setTotalExtent] = useState(0);

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

  const getDbFieldName = (field) => {
    if (field === CROP_LOOK_FIELD.EXTENT_MAJOR) {
      return "targetedExtentMajor";
    } else if (field === CROP_LOOK_FIELD.EXTENT_MINOR) {
      return "targetedExtentMinor";
    } else if (field === CROP_LOOK_FIELD.EXTENT_RAINFED) {
      return "targetedExtentRainfed";
    } else if (field === CROP_LOOK_FIELD.EXTENT_IRRIGATE) {
      return "targetedExtentIrrigate";
    } else if (field === CROP_LOOK_FIELD.EXTENT) {
      return "targetedExtent";
    } else {
      return "na";
    }
  };

  const extentHandler = (cropIndex, varietyIndex, field, value) => {
    const newExtent = parseInt(totalExtent) + parseInt(value);
    setTotalExtent(newExtent);
    targetedExtentHandler(cropIndex, varietyIndex, field, value);
  };

  return (
    <>
      <Grid container spacing={1} sx={{paddingTop: "20px"}}>
        <Grid item xs={2}>
          <Chip
            avatar={<Avatar alt="Natacha" src={varietyTarget.imageUrl} />}
            label={varietyTarget.varietyName}
            variant="outlined"
            sx={{ mt: "4px", bgcolor: "#A7E99C", width: "400px" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            {configFields.map((field) => (
              <Grid item xs={2}>
                <TextField
                  type="number"
                  disabled={mode === DEF_ACTIONS.VIEW}
                  variant="outlined"
                  id="input1"
                  label={field + " (In Ha)"}
                  value={varietyTarget[getDbFieldName(field)]}
                  onChange={(e) =>
                    extentHandler(
                      cropIndex,
                      varietyIndex,
                      getDbFieldName(field),
                      e.target.value
                    )
                  }
                  //style={{ flex: 1, marginRight: 8 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                    },
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
                id="input5"
                label="Total Extent (In Ha)"
                value={varietyTarget["totalExtent"] || 0}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
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
                <Button
                  disabled={mode === DEF_ACTIONS.VIEW}
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={handleAddDamage}
                  //sx={{ marginTop: "10px" }}
                >
                  Add Damage
                </Button>
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
