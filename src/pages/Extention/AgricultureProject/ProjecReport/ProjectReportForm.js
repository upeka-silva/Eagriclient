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
  get_ActivityListByProjectId,
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
  get_SubActivityByActivityId,
  handleProjectSubActivity,
  updateProjectSubActivity,
} from "../../../../redux/actions/extension/agricultureProject/ProjectSubActivity/action";
import {
  get_AgricultureProjectAllList,
  get_AgricultureProjectList,
} from "../../../../redux/actions/extension/agricultureProject/action";
import { get_IndicatorBySubActivityId } from "../../../../redux/actions/extension/agricultureProject/projectIndicator/action";
import { handleProjectReport } from "../../../../redux/actions/extension/agricultureProject/ProjectReport/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectReportForm({
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
  console.log({ ProjectActivityData });
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(data);
  console.log("datanewss", data);
  const [saving, setSaving] = useState(false);

  const [projectData, setProjectData] = useState([]);
  console.log({ projectData });
  const [projectActivityData, setProjectActivityData] = useState([]);
  const [projectSubActivityData, setProjectSubActivityData] = useState([]);
  const [projectIndicatorData, setProjectIndicatorData] = useState([]);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  console.log({ projectIndicatorData });

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  useEffect(() => {
    console.log("refresh ");
  }, []);

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
      if (action === DEF_ACTIONS.ADD && data?.projectIndicatorDTO?.id) {
        console.log("handleFarmLandOwnership", ProjectActivityData?.id);
        await handleProjectReport(data, onSuccess, onError);
        refresh();
        resetData()
        setFormData({})
        setProjectActivityData([])
        setProjectSubActivityData([])
        setProjectIndicatorData([])
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

  useEffect(() => {
    const getProjectList = async () => {
      await get_AgricultureProjectAllList().then((res) => {
        setProjectData(res?.dataList);
      });
    };

    getProjectList();
  }, []);

  useEffect(() => {
    if (data?.projectId) {
      const getProjectActivityList = async () => {
        await get_ActivityListByProjectId(data?.projectId).then((res) => {
          setProjectActivityData(res?.dataList);
        });
      };
      getProjectActivityList();
    }

    if (data?.activityId) {
      const getProjectSubActivityList = async () => {
        await get_SubActivityByActivityId(data?.activityId).then((res) => {
          setProjectSubActivityData(res?.dataList);
        });
      };
      getProjectSubActivityList();
    }

    if (data?.subActivityId) {
      const getProjectIndicatorList = async () => {
        await get_IndicatorBySubActivityId(data?.subActivityId).then((res) => {
          setProjectIndicatorData(res?.dataList);
        });
      };
      getProjectIndicatorList();
    }
  }, [data]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <FormWrapper>
          <FormHeader style={{ marginLeft: "15px" }}>
            {action === DEF_ACTIONS.ADD ? "Add" : ""} Project Report
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
              width: "100%",
            }}
          >
            <Grid item sm={6} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Select Project</FieldName>
                <Select
                  name="projectId"
                  id="projectId"
                  value={data?.projectId || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={
                    (e) => {
                      onChange(e?.target?.value, "projectId");
                    }
                    // handleChange(e?.target?.value || "", "unitType")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                  }}
                  size="small"
                >
                  {projectData?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.description}
                    </MenuItem>
                  ))}
                </Select>
              </FieldWrapper>
            </Grid>

            {projectActivityData.length > 0 && (
              <>
                <Grid item sm={6} md={3} lg={3}>
                  <FieldWrapper>
                    <FieldName>Project Activity</FieldName>
                    <Select
                      name="activityId"
                      id="activityId"
                      value={data?.activityId || ""}
                      disabled={action === DEF_ACTIONS.VIEW}
                      onChange={
                        (e) => {
                          onChange(e?.target?.value, "activityId");
                        }
                        // handleChange(e?.target?.value || "", "unitType")
                      }
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                      }}
                      size="small"
                    >
                      {projectActivityData?.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FieldWrapper>
                </Grid>
              </>
            )}

            {projectSubActivityData?.length > 0 && (
              <>
                <Grid item sm={6} md={3} lg={3}>
                  <FieldWrapper>
                    <FieldName>Project Sub Activity</FieldName>
                    <Select
                      name="subActivityId"
                      id="subActivityId"
                      value={data?.subActivityId || ""}
                      disabled={action === DEF_ACTIONS.VIEW}
                      onChange={
                        (e) => {
                          onChange(e?.target?.value, "subActivityId");
                        }
                        // handleChange(e?.target?.value || "", "unitType")
                      }
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                      }}
                      size="small"
                    >
                      {projectSubActivityData?.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FieldWrapper>
                </Grid>
              </>
            )}

            {projectIndicatorData?.length > 0 && (
              <>
                <Grid item sm={6} md={3} lg={3}>
                  <FieldWrapper>
                    <FieldName>Indicator</FieldName>
                    <Select
                      name="indicatorId"
                      id="indicatorId"
                      value={data?.projectIndicatorDTO?.id || ""}
                      disabled={action === DEF_ACTIONS.VIEW}
                      onChange={
                        (e) => {
                          const selectedItemId = e?.target?.value || "";
                          const selectedItem = projectIndicatorData.find(
                            (item) => item.id === selectedItemId
                          );
                          onChange(
                            { id: selectedItemId, ...selectedItem },
                            "projectIndicatorDTO"
                          );
                        }
                        // handleChange(e?.target?.value || "", "unitType")
                      }
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                      }}
                      size="small"
                    >
                      {projectIndicatorData?.map((item) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FieldWrapper>
                </Grid>
              </>
            )}
          </Grid>
          {data?.projectIndicatorDTO?.id && (
            <>
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
                      <FieldName>Report Id</FieldName>
                      <TextField
                        name="reportId"
                        id="reportId"
                        value={data?.reportId || ""}
                        disabled={
                          action === DEF_ACTIONS.VIEW ||
                          action === DEF_ACTIONS.EDIT
                        }
                        onChange={(e) =>
                          onChange(e?.target?.value || "", "reportId")
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
                      <FieldName>Reported Value</FieldName>
                      <TextField
                        name="reportValue"
                        id="reportValue"
                        value={data?.reportValue || ""}
                        disabled={action === DEF_ACTIONS.VIEW}
                        onChange={(e) =>
                          onChange(e?.target?.value || "", "reportValue")
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
            </>
          )}
        </FormWrapper>
      </Dialog>
    </div>
  );
}
