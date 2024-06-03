import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";
import { Colors } from "../../utils/constants/Colors";
import { getAllAiAndMahaweliUnits } from "../../redux/actions/cropLook/cropTarget/actions";
import { get_CropList } from "../../redux/actions/crop/crop/action";
import { get_GnDivisionListWithoutPage } from "../../redux/actions/gnDivision/action";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const CreateGroupDialog = ({
  open,
  handleClose,
  confirmAction,
  formData,
  mode,
  handleChange,
  action,
}) => {
  const [options, setOptions] = useState([]);
  const [cropOptions, setCropOptions] = useState([]);
  const [gnOptions, setGnOptions] = useState([]);

  useEffect(() => {
    getAllAiAndMahaweliUnits().then(({ dataList = [] }) => {
      setOptions(dataList);
    });
    get_CropList().then(({ dataList = [] }) => {
      let newDtaList = dataList.map((item) => {
        return { value: item.id, name: item.description };
      });
      setCropOptions(newDtaList);
    });
    get_GnDivisionListWithoutPage().then(({ dataList = [] }) => {
      let newGnOptions = dataList.map((item) => {
        return { value: item.id, name: item.name };
      });
      setGnOptions(newGnOptions);
    });
  }, []);

  return (
    <Dialog
      className="create-group-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="new-group"
      aria-describedby="add a new group"
    >
      <DialogTitle
        id="new-group"
        style={{
          fontFamily: Fonts.fontStyle1,
        }}
      >
        {mode} Create New Group
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            sx={{
              margin: "15px",
              width: "97%",
              borderRadius: "5px",
            }}
          >
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Group Id
                </FieldName>
                <TextField
                  name="groupId"
                  id="groupId"
                  value={formData?.groupId || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "groupId")
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Description
                </FieldName>
                <TextField
                  name="description"
                  id="description"
                  value={formData?.description || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "description")
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
              <FieldWrapper 
                className="autocomplete">
                <FieldName>AI Region/ Mahaweli Block</FieldName>
                <Autocomplete
                  // multiple
                  options={options}
                  disabled={action === DEF_ACTIONS.VIEW}
                  value={
                    options[0]?.parentType === "MAHAWELI"
                      ? formData?.mahaweliBlockDto
                      : formData?.aiRegionIdDto
                  }
                  getOptionLabel={(i) =>
                    formData?.id
                      ? ` ${i?.description}`
                      : `${i?.code} - ${i?.description}`
                  }
                  onChange={(event, value) => {
                    handleChange(
                      value,
                      options[0]?.parentType === "MAHAWELI"
                        ? "mahaweliBlockDto"
                        : "aiRegionIdDto"
                    );
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Is Default</FieldName>
                <Switch
                  name="isDefault"
                  id="isDefault"
                  value={formData?.isDefault || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "isDefault")
                  }
                  checked={formData?.isDefault}
                  aria-label="Switch demo"
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Is Custom</FieldName>
                <Switch
                  name="isCustom"
                  id="isCustom"
                  value={formData?.isCustom || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || "", "isCustom")
                  }
                  checked={formData?.isCustom}
                  aria-label="Switch demo"
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Filter Type</FieldName>
                <Select
                  name="filterType"
                  id="filterType"
                  value={formData?.filterType || ""}
                  disabled={action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "filterType")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                  }}
                  size="small"
                >
                  <MenuItem value={"CROP"}>Crop</MenuItem>
                  <MenuItem value={"GN"}>Gn</MenuItem>
                </Select>
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Crop</FieldName>
                <Autocomplete
                  multiple
                  disabled={
                    formData?.filterType !== "CROP" ||
                    formData?.filterType === null || action === DEF_ACTIONS.VIEW
                  }
                  options={cropOptions}
                  value={
                    formData?.filterType === "CROP"
                      ? formData?.filterValueDTOS || []
                      : []
                  }
                  getOptionLabel={(i) => ` ${i?.value} - ${i?.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "filterValueDTOS");
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldName>Gn</FieldName>
                <Autocomplete
                  multiple
                  disabled={
                    formData?.filterType !== "GN" ||
                    formData?.filterType === null || action === DEF_ACTIONS.VIEW
                  }
                  options={gnOptions}
                  value={
                    formData?.filterType === "GN"
                      ? formData?.filterValueDTOS || []
                      : []
                  }
                  getOptionLabel={(i) => `${i?.name}`}
                  onChange={(event, value) => {
                    handleChange(value, "filterValueDTOS");
                  }}
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          color="info"
          variant="contained"
          size="small"
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
        <Button
          disabled={action === DEF_ACTIONS.VIEW}
          onClick={(event) => confirmAction(event, formData, mode)}
          color="success"
          variant="contained"
          size="small"
          sx={{ marginLeft: "20px" }}
        >
          {action === DEF_ACTIONS.EDIT ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupDialog;
