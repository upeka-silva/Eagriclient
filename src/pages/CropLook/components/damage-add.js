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

const DamageAddModal = ({
  isModalOpen,
  handleModalCancel,
  mode,
  varietyReportId,
}) => {
  const [damageExtents, setDamageExtents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultDamageExt = [
    {
      damageCategory: { id: 0 },
      damageType: { id: 0 },
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
      const dataList = await getDamageExtentsByVarietyReportId(varietyId);

      var newDamageExt = [];
      if (dataList.dataList && dataList?.dataList?.length > 0) {
        newDamageExt = dataList.dataList;
      } else {
        newDamageExt = defaultDamageExt;
      }
      const updatedDamageExts = [...damageExtents, ...newDamageExt];

      setDamageExtents(updatedDamageExts);
    }

    fetchData(varietyReportId);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [damageExtents]);

  const onSubmitDamageExtent = () => {
    updateDamageExtents(varietyReportId, damageExtents);
    handleModalCancel();
  };

  const damageExtentHandler = (index, property, value) => {
    const updatedExtents = [...damageExtents];
    updatedExtents[index][property] = value;
    setDamageExtents(updatedExtents);
  };

  const addNewRow = () => {
    const newDamageExt = {
      damageCategory: { id: 0 },
      damageType: { id: 0 },
      extent10: 0,
      extent25: 0,
      extent50: 0,
      extent75: 0,
      extent100: 0,
    };
    const updatedDamageExts = [...damageExtents, newDamageExt];
    setDamageExtents(updatedDamageExts);
  };

  const RemoveRow = (index) => {
    const updateDamageExt = [...damageExtents];
    if (index !== -1) {
      updateDamageExt.splice(index);
      setDamageExtents(updateDamageExt);
    }
  };

  const damageCategory = [
    {
      id: 1,
      code: "DC1",
      name: "Damage Category 1",
    },
  ];

  const damageType = [
    {
      id: 1,
      code: "DT1",
      name: "Damage Type 1",
    },
  ];

  return (
    <DialogBox
      open={isModalOpen}
      title="Add Crop Damage"
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
              <Grid container sx={{ padding: "10px"}} >
                <Grid item sm={2} md={2} lg={2}>
                  <FieldWrapper>
                    <Autocomplete
                      disabled={mode === DEF_ACTIONS.VIEW}
                      options={damageCategory}
                      //value={selectedAiRegion}
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
                    <Autocomplete
                      disabled={mode === DEF_ACTIONS.VIEW}
                      options={damageType}
                      //value={selectedAiRegion}
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
                      onClick={addNewRow}
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
