import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";

import {
  handleProjectActivity,
  updateProjectActivity,
} from "../../../../redux/actions/extension/agricultureProject/ProjectActivity/action";
import { ButtonWrapper } from "../../../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../../../components/FormLayout/FieldWrapper";
import { FormHeader } from "../../../../components/FormLayout/FormHeader";
import { SnackBarTypes } from "../../../../utils/constants/snackBarTypes";
import { FormWrapper } from "../../../../components/FormLayout/FormWrapper";
import { ActionWrapper } from "../../../../components/PageLayout/ActionWrapper";
import { useSnackBars } from "../../../../context/SnackBarContext";
import { Colors } from "../../../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../../../utils/constants/permission";
import {
  handleProjectSubActivity,
  updateProjectSubActivity,
} from "../../../../redux/actions/extension/agricultureProject/ProjectSubActivity/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectSubActivityForm({
  open = false,
  onClose = () => {},
  action,
  ProjectActivityData,
  data,
  loading,
  stopLoading,
  onChange,
  resetData,
  subActivityDataList,
  refresh,
  setOpenActivity,
  activityDataId,
}) {
  console.log({ activityDataId });
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(data);
  console.log("datanewss", data);
  const [saving, setSaving] = useState(false);

  let nextGenId;
  if (action === DEF_ACTIONS.ADD && activityDataId) {
    if (subActivityDataList?.length > 0) {
      nextGenId = (
        parseFloat(
          subActivityDataList[subActivityDataList.length - 1].subActivityId
        ) + 0.1
      ).toFixed(1);
    } else {
      nextGenId = activityDataId?.activityId + "." + 1;
    }
  }

  const enableSave = () => {
    if (action === DEF_ACTIONS.EDIT) {
      if (JSON.stringify(data || {}) !== JSON.stringify(formData)) {
        return true;
      }
    }
    if (action === DEF_ACTIONS.ADD && Object.keys(data || {}).length > 0) {
      return true;
    }
    return false;
  };

  const resetForm = () => {
    if (action === DEF_ACTIONS.EDIT) {
      setFormData(data || {});
    } else {
      setFormData({});
    }
  };
  const handleFormSubmit = async () => {
    setSaving(true);
    // let dateFrom = new Date(data.dateFrom);
    // let dateUntil = new Date(data.dateUntil);
    try {
      if (action === DEF_ACTIONS.EDIT) {
        console.log("update");
        await updateProjectSubActivity(
          {
            ...data,
          },

          onSuccess,
          onError
        );
        refresh();
      }
      if (action === DEF_ACTIONS.ADD && ProjectActivityData?.id) {
        console.log("handleFarmLandOwnership", ProjectActivityData?.id);
        await handleProjectSubActivity(
          {
            ...data,
            projectActivityDTO: ProjectActivityData,
            subActivityId: nextGenId,
          },
          onSuccess,
          onError
        );
        refresh();
      }
      setSaving(false);
      setOpenActivity(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
    setSaving(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        fullWidth="true"
        minWidth="lg"
        maxWidth="lg"
      >
        <FormWrapper>
          <FormHeader ml={2} mt={2}>
            {action === DEF_ACTIONS.ADD ? "Add" : ""} Project Sub Activity
          </FormHeader>

          <ButtonWrapper
            isCeneter
            style={{
              width: "95%",
              justifyContent: "flex-start",
              margin: "0",
              paddingLeft: "18px",
            }}
          >
            <ActionWrapper>
              {saving ? (
                <Button variant="contained" color="success" size="small">
                  {action === DEF_ACTIONS.ADD ? "ADDING..." : "UPDATING..."}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    disabled={!enableSave()}
                    onClick={handleFormSubmit}
                    size="small"
                    color="success"
                  >
                    {action === DEF_ACTIONS.ADD ? "SAVE" : "UPDATE"}
                  </Button>
                  <Button
                    onClick={resetData}
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "10px" }}
                  >
                    RESET
                  </Button>
                </>
              )}
            </ActionWrapper>

            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ButtonWrapper>
          <Grid
            container
            sx={{
              borderRadius: "5px",
              margin: "15px",
              marginBottom: "20px",
              width: "97%",
              boxShadow: "0px 3px 6px #00000029",
            }}
          >
            {
              <Grid item sm={6} md={3} lg={3}>
                <FieldWrapper>
                  <FieldName>Sub Activity Id</FieldName>
                  <TextField
                    name="subActivityId"
                    id="subActivityId"
                    value={nextGenId ? nextGenId : data?.subActivityId || ""}
                    disabled={
                      action === DEF_ACTIONS.VIEW ||
                      action === DEF_ACTIONS.EDIT ||
                      action === DEF_ACTIONS.ADD
                    }
                    onChange={(e) =>
                      onChange(e?.target?.value || "", "subActivityId")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </Grid>
            }

            {
              <Grid item sm={6} md={9} lg={9}>
                <FieldWrapper>
                  <FieldName>Description</FieldName>
                  <TextField
                    name="description"
                    id="description"
                    value={data?.description || ""}
                    disabled={action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      onChange(e?.target?.value || "", "description")
                    }
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                  />
                </FieldWrapper>
              </Grid>
            }
          </Grid>
        </FormWrapper>
      </Dialog>
    </div>
  );
}
