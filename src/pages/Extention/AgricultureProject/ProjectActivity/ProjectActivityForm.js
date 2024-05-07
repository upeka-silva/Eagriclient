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




import { handleProjectActivity, updateProjectActivity } from "../../../../redux/actions/extension/agricultureProject/ProjectActivity/action";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectActivityForm({
  open = false,
  onClose = () => {},
  action,
  ProjectActivityData,
  data,
  loading,
  stopLoading,
  onChange,
  resetData,
  refresh,
  setOpenActivity,
}) {
  console.log({ProjectActivityData})
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(data);
  console.log("datanewss",data)
  const [gnDivisionList, setGnDivisionList] = useState([]);
  const [saving, setSaving] = useState(false);
  const [farmerList, setFarmerList] = useState([]);

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
      if (ProjectActivityData?.id && data?.id) {
        await updateProjectActivity(
          {
            ...data,
            agricultureProjectDTO: ProjectActivityData,
          },

          onSuccess,
          onError
        );
        refresh();
      }
      if (ProjectActivityData?.id) {
        console.log("handleFarmLandOwnership",ProjectActivityData?.id);
        await handleProjectActivity(
          {
            ...data,
            agricultureProjectDTO: ProjectActivityData,
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

  // useEffect(() => {
  //   get_GnDivisionListWithoutPage().then(({ dataList = [] }) => {
  //     setGnDivisionList(dataList);
  //   });
  // }, []);

  // useEffect(() => {
  //   get_FarmerList().then(({ dataList = [] }) => {
  //     setFarmerList(dataList);
  //   });
  // }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        maxWidth={"md"}
      >
        <FormWrapper>
          <FormHeader style={{ marginLeft: "15px" }}>
            {action === DEF_ACTIONS.ADD ? "Add" : ""} Project Activity
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
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              margin: "15px",
              width: "97%",
            }}
          >
            {
              <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Activity Id</FieldName>
                  <TextField
                    name="activityId"
                    id="aactivityId"
                    value={data?.activityId || ""}
                    disabled={action === DEF_ACTIONS.VIEW || action === DEF_ACTIONS.EDIT}
                    onChange={(e) =>
                      onChange(e?.target?.value || "", "activityId")
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
              <Grid item sm={6} md={4} lg={4}>
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
