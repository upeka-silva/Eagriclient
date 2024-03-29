import {
  Autocomplete,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import DialogBox from "../../../components/PageLayout/DialogBox";
import { Add, CancelOutlined, CheckRounded, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import {
  getDamageExtentsByVarietyReportId,
  updateDamageExtents,
} from "../../../redux/actions/cropLook/biWeekReporting/actions";
import {
  getAllDamageCategory,
  getAllDamageTypes,
} from "../../../redux/actions/crop/cropDamage/action";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { useLocation } from "react-router";

const DamageAddModal = ({ isModalOpen, handleModalCancel, mode, variety }) => {
  const [damageExtents, setDamageExtents] = useState([]);
  const [damageCategoryList, setDamageCategoryList] = useState([]);
  const [damageTypeList, setDamageTypeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDamageTypeLoading, setIsDamageTypeLoading] = useState(false);
  const { addSnackBar } = useSnackBars();

  const defaultDamageExt = [
    {
      damageCategory: { id: 0, name: "Please Select", damageTypes: [{id: 0, name: "Please Select"}] },
      damageType: { id: 0, name: "Please Select" },
      extent10: 0,
      extent25: 0,
      extent50: 0,
      extent75: 0,
      extent100: 0,
    },
  ];

  useEffect(() => {
    async function fetchData(varietyId) {
      setIsLoading(true);

      const damageTypes = await getAllDamageCategory();
      setDamageCategoryList(damageTypes);

      const dataList = await getDamageExtentsByVarietyReportId(varietyId);

      var newDamageExt = [];
      if (dataList && dataList?.length > 0) {
        newDamageExt = dataList;
      } else {
        newDamageExt = defaultDamageExt;
      }

      const updatedTypes = [...damageTypeList];
      newDamageExt.map((data, index) => {
        updatedTypes[index] = data.damageCategory.damageTypes;
      });
      setDamageTypeList(updatedTypes);

      const updatedDamageExts = [...damageExtents, ...newDamageExt];

      setDamageExtents(updatedDamageExts);

      setIsLoading(false);
    }

    fetchData(variety.id);
  }, []);

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message:
      damageExtents[0]?.id
          ? "Successfully Updated"
          : "Successfully Added",
    });
  };
  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login Failed",
    });
  };


  const onSubmitDamageExtent = () => {
    updateDamageExtents(variety.id, damageExtents, onSuccess, onError);
    handleModalCancel();
  };

  const damageExtentHandler = (index, property, value) => {
    const updatedExtents = [...damageExtents];
    updatedExtents[index][property] = value;
    setDamageExtents(updatedExtents);

    if ("damageCategory" === property) {
      setIsDamageTypeLoading(true);
      getAllDamageTypes(value.id).then((data = []) => {
        const updatedTypes = [...damageTypeList];
        updatedTypes[index] = data;
        setDamageTypeList(updatedTypes);
        setIsDamageTypeLoading(false);
      });
    }
  };

  const addNewRow = (index) => {

    const updatedDamageExts = [...damageExtents, defaultDamageExt[0]];
    setDamageExtents(updatedDamageExts);

    const updatedTypes = [...damageTypeList];
    updatedTypes[index + 1] = [{id: 0, name: "Please Select"}];
    setDamageTypeList(updatedTypes);
  };

  const RemoveRow = (index) => {
    const updateDamageExt = [...damageExtents];
    if (index !== -1) {
      updateDamageExt.splice(index);
      setDamageExtents(updateDamageExt);
    }
  };

  return (
    <DialogBox
      open={isModalOpen}
      title={mode === DEF_ACTIONS.EDIT ? "Add Crop Damage For - " + variety?.varietyName : "View Crop Damage For - " + variety?.varietyName}
      maxWidth
      fullWidth
      actions={
        <ActionWrapper>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
          >
            <Button
              disabled={mode === DEF_ACTIONS.VIEW}
              color="info"
              onClick={onSubmitDamageExtent}
              sx={{ ml: "8px" }}
            >
              <CheckRounded />
              Save
            </Button>
            <Button
              color="error"
              onClick={handleModalCancel}
              sx={{ ml: "8px" }}
            >
              <CancelOutlined />
              Cancel
            </Button>
          </ButtonGroup>
        </ActionWrapper>
      }
    >
      <>
        {!isLoading ? (
          damageExtents.map((damageExtent, index) => (
            <div>
              <Grid container sx={{ padding: "10px" }}>
                <Grid item sm={2} md={2} lg={2}>
                  <FieldWrapper>
                    <Autocomplete
                      disabled={mode === DEF_ACTIONS.VIEW}
                      options={damageCategoryList}
                      value={damageExtent.damageCategory || ""}
                      getOptionLabel={(i) => `${i.name}`}
                      onChange={(event, value) => {
                        damageExtentHandler(index, "damageCategory", value);
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          label="Damage Category"
                        />
                      )}
                      fullWidth
                    />
                  </FieldWrapper>
                </Grid>

                <Grid item sm={2} md={2} lg={2}>
                  <FieldWrapper>
                    {!isDamageTypeLoading ? (
                      <Autocomplete
                        disabled={mode === DEF_ACTIONS.VIEW}
                        options={damageTypeList[index]}
                        value={damageExtent?.damageType || ""}
                        getOptionLabel={(i) => `${i.name}`}
                        onChange={(event, value) => {
                          damageExtentHandler(index, "damageType", value);
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            variant="outlined"
                            label="Damage Type"
                          />
                        )}
                        fullWidth
                      />
                    ) : (
                      <CircularProgress />
                    )}
                  </FieldWrapper>
                </Grid>

                <Grid item xs={1}>
                  <FieldWrapper>
                    <TextField
                      type="number"
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      id="input1"
                      label="10% Extent"
                      value={damageExtent.extent10}
                      onChange={(e) =>
                        damageExtentHandler(index, "extent10", e.target.value)
                      }
                      //style={{ flex: 1, marginRight: 8 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={1}>
                  <FieldWrapper>
                    <TextField
                      type="number"
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      id="input2"
                      label="25% Extent"
                      value={damageExtent.extent25}
                      onChange={(e) =>
                        damageExtentHandler(index, "extent25", e.target.value)
                      }
                      //style={{ flex: 1, marginRight: 8 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={1}>
                  <FieldWrapper>
                    <TextField
                      type="number"
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      id="input3"
                      label="50% Extent"
                      value={damageExtent.extent50}
                      onChange={(e) =>
                        damageExtentHandler(index, "extent50", e.target.value)
                      }
                      //style={{ flex: 1 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={1}>
                  <FieldWrapper>
                    <TextField
                      type="number"
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      id="input4"
                      label="75% Extent"
                      value={damageExtent.extent75}
                      onChange={(e) =>
                        damageExtentHandler(index, "extent75", e.target.value)
                      }
                      // style={{ flex: 1 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={1}>
                  <FieldWrapper>
                    <TextField
                      type="number"
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      id="input5"
                      label="100% Extent"
                      value={damageExtent.extent100}
                      onChange={(e) =>
                        damageExtentHandler(index, "extent100", e.target.value)
                      }
                      // style={{ flex: 1 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                {index !== 0 ? (
                  <Grid item xs={1}>
                    <Button
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => RemoveRow(index)}
                    >
                      <Remove />
                    </Button>
                  </Grid>
                ) : null}
                {damageExtents.length === index + 1 ? (
                  <Grid item xs={1}>
                    <Button
                      disabled={mode === DEF_ACTIONS.VIEW}
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => addNewRow(index)}
                    >
                      <Add />
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </div>
          ))
        ) : (
          <CircularProgress />
        )}
      </>
    </DialogBox>
  );
};

export default DamageAddModal;
