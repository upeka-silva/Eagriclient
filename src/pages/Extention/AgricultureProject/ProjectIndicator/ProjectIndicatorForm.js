import {
  Button,
  Dialog,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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
import { get_isoUnitList } from "../../../../redux/actions/app_settings/roles/isoUnit/action";
import {
  get_IndicatorBySubActivityId,
  handleProjectIndicator,
  updateProjectIndicator,
} from "../../../../redux/actions/extension/agricultureProject/projectIndicator/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectIndicatorForm({
  open = false,
  onClose = () => {},
  action,
  ProjectSubActivityData,
  data,
  onChange,
  resetData,
  refresh,
  setOpenActivity,
  indicatorDataList,
}) {
  console.log({ ProjectSubActivityData });
  const { addSnackBar } = useSnackBars();
  const [formData, setFormData] = useState(data);
  console.log("newformff", data);
  const [saving, setSaving] = useState(false);
  const [isoUnitList, setIsoUnitList] = useState([]);
  const [indicatorData,setIndicatorDataList] = useState();

  console.log("kk", indicatorData );

  useEffect(() => {
    ProjectSubActivityData?.id &&
      get_IndicatorBySubActivityId(ProjectSubActivityData?.id).then(
        ({ dataList = [] }) => {
          console.log("newinlistss",dataList);
          setIndicatorDataList(dataList);
        }
      );
  }, [open]);

  let nextGenId;
  if (action === DEF_ACTIONS.ADD && ProjectSubActivityData) {
    if (indicatorData?.length > 0) {
      let result = indicatorData[indicatorData.length - 1].indicatorId;
      nextGenId = result.replace(/(\d+)\.(\d+)\.(\d+)/, (match, p1, p2, p3) => p1 + "." + p2 + "." + (parseInt(p3) + 1));
      console.log({ result });
      
    } else {
      nextGenId = ProjectSubActivityData?.subActivityId + ".1";
    }
  }

  useEffect(() => {
    get_isoUnitList().then(({ dataList = [] }) => {
      setIsoUnitList(dataList);
    });
  }, []);

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
        await updateProjectIndicator(
          {
            ...data,
            projectSubActivityDTO: ProjectSubActivityData,
          },

          onSuccess,
          onError
        );
        refresh();
      }
      if (action === DEF_ACTIONS.ADD && ProjectSubActivityData?.id) {
        console.log("handleFarmLandOwnership", ProjectSubActivityData?.id);
        await handleProjectIndicator(
          {
            ...data,
            projectSubActivityDTO: ProjectSubActivityData,
            indicatorId : nextGenId
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
        fullWidth="true"
        minWidth="lg"
        maxWidth="lg"
      >
        <FormWrapper>
          <FormHeader ml={2} mt={2}>
            {action === DEF_ACTIONS.ADD ? "Add" : ""} Project Indicator
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
                    disabled={action === DEF_ACTIONS.VIEW}
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
              <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Indicator Id</FieldName>
                  <TextField
                    name="indicatorId"
                    id="indicatorId"
                    value={nextGenId ? nextGenId : data?.indicatorId || ""}
                    disabled={
                      action === DEF_ACTIONS.VIEW || action === DEF_ACTIONS.EDIT
                      || action === DEF_ACTIONS.ADD
                    }
                    onChange={(e) =>
                      onChange(e?.target?.value || "", "indicatorId")
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
              <Grid item sm={6} md={8} lg={8}>
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

            {
              <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>unit</FieldName>
                  <Select
                    name="isoUnitDTO"
                    id="isoUnitDTO"
                    value={data?.isoUnitDTO?.id || ""}
                    disabled={action === DEF_ACTIONS.VIEW}
                    onChange={
                      (e) => {
                        const selectedItemId = e?.target?.value || "";
                        const selectedItem = isoUnitList.find(
                          (item) => item.id === selectedItemId
                        );
                        onChange(
                          { id: selectedItemId, ...selectedItem },
                          "isoUnitDTO"
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
                    {isoUnitList?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* <TextField
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
                  /> */}
                </FieldWrapper>
              </Grid>
            }

            {
              <Grid item sm={6} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName>Target</FieldName>
                  <TextField
                    name="target"
                    id="target"
                    value={data?.target || ""}
                    disabled={action === DEF_ACTIONS.VIEW}
                    onChange={(e) => onChange(e?.target?.value || "", "target")}
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
