import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import { get } from "../../services/api";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Colors } from "../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const CropSelectDropDown = (props) => {
  const {
    selectedCropCallback,
    selectedVarietyCallback,
    mode,
    crop,
    cropVariety,
    selectedCropCategory,
    setSelectedCropCategory,
    selectedCropSubCategory,
    setSelectedCropSubCategory
  } = props;

  const [cropCategories, setCropCategories] = useState([]);
  const [cropSubCategories, setCropSubCategories] = useState([]);

  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const [cropVarieties, setCropVarieties] = useState([]);
  const [selectedCropVariety, setSelectedCropVariety] = useState(null);

  // Load crop categories from an API
  useEffect(() => {
    const fetchCropCategory = async (path) => {
      try {
        const { payloadDto } = await get(`${path}`, true);
        setCropCategories(payloadDto);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCropCategory("geo-data/crop-categories");
  }, []);

 

  useEffect(() => {
    mode === DEF_ACTIONS.ADD && setSelectedCrop(null);
    mode === DEF_ACTIONS.ADD && setSelectedCropVariety(null);
    console.log(crop);
    mode === DEF_ACTIONS.EDIT && setSelectedCrop(crop);
    mode === DEF_ACTIONS.EDIT && setSelectedCropVariety(cropVariety);
   
  }, [mode]);

  useEffect(() => {
    if (selectedCropCategory) {
      const fetchCropSubCategory = async (path, id) => {
        try {
          const { payloadDto } = await get(`${path}/${id}`, true);
          setCropSubCategories(payloadDto);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCropSubCategory(
        "geo-data/crop-sub-categories/crop-category",
        selectedCropCategory
      );
    } else {
      // Clear the crops if no category is selected
      setCropSubCategories([]);
    }
  }, [selectedCropCategory]);

  // Load crops based on selected crop category
  useEffect(() => {
    if (selectedCropSubCategory) {
      const fetchCrop = async (path, id) => {
        try {
          const { payloadDto } = await get(`${path}/${id}`, true);
          setCrops(payloadDto);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCrop("geo-data/crops/crop-sub-category", selectedCropSubCategory);
    } else {
      // Clear the crops if no category is selected
      setCrops([]);
    }
  }, [selectedCropSubCategory]);

  // Load crop varieties based on selected crop
  useEffect(() => {
    if (selectedCrop) {
      const fetchCropVarity = async (path, id) => {
        try {
          const { payloadDto } = await get(`${path}/${id}`, true);
          setCropVarieties(payloadDto);
        } catch (error) {
          console.log(error);
        }
      };
      console.log(selectedCrop);
      fetchCropVarity("geo-data/crop-varieties/crop", selectedCrop?.id);
    } else {
      // Clear the crop varieties if no crop is selected
      setCropVarieties([]);
    }
  }, [selectedCrop]);

  return (
    <>
      {mode === DEF_ACTIONS.ADD && (
        <>
          <Grid item sm={12} md={12} lg={4}>
            <FieldWrapper>
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                Crop Category
              </FieldName>

              <Select
                name="questionType"
                id="questionType"
                value={selectedCropCategory || ""}
                disabled={mode === DEF_ACTIONS.VIEW}
                onChange={(e) => setSelectedCropCategory(e?.target?.value)}
                size="small"
                fullWidth
                clearable
                sx={{
                  borderRadius: "8px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              >
                {cropCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryId} - {category.description}
                  </MenuItem>
                ))}
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={12} lg={5}>
            <FieldWrapper>
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                Crop Sub Category
              </FieldName>

              <Select
                name="questionType"
                id="questionType"
                value={selectedCropSubCategory}
                disabled={mode === DEF_ACTIONS.VIEW}
                onChange={(e) => setSelectedCropSubCategory(e?.target?.value)}
                size="small"
                fullWidth
                sx={{
                  borderRadius: "8px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  },
                }}
              >
                {cropSubCategories.map((cropSub) => (
                  <MenuItem key={cropSub.id} value={cropSub.id}>
                    {cropSub.subCategoryId} - {cropSub.description}
                  </MenuItem>
                ))}
              </Select>
            </FieldWrapper>
          </Grid>
        </>
      )}
      <Grid item sm={12} md={12} lg={6}>
        <FieldWrapper>
          <FieldName
            style={{
              width: "100%",
            }}
          >
            Crop
          </FieldName>

          <Autocomplete
            name="farmerDTO"
            id="farmerDTO"
            disabled={mode === DEF_ACTIONS.VIEW || mode === DEF_ACTIONS.EDIT}
            disableClearable
            options={crops}
            value={selectedCrop || crop}
            getOptionLabel={(i) => `${i.cropId} - ${i.description} ${" "}`}
            onChange={(event, value) => {
              setSelectedCrop(value);
              selectedCropCallback(value?.id);
            }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              },
            }}
            size="small"
            renderInput={(params) => (
              <>
                <TextField {...params} size="small" />
              </>
            )}
          />
        </FieldWrapper>
      </Grid>
      <Grid item sm={12} md={12} lg={6}>
        <FieldWrapper>
          <FieldName
            style={{
              width: "100%",
            }}
          >
            Crop Variety
          </FieldName>

          <Autocomplete
            name="farmerDTO"
            id="farmerDTO"
            disabled={mode === DEF_ACTIONS.VIEW}
            disableClearable
            options={cropVarieties}
            value={selectedCropVariety || cropVariety}
            getOptionLabel={(i) => `${i.varietyId} - ${i.varietyName} ${" "}`}
            onChange={(event, value) => {
              setSelectedCropVariety(value);
              selectedVarietyCallback(value?.id);
            }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: `${Colors.white}`,
              },
            }}
            size="small"
            renderInput={(params) => (
              <>
                <TextField {...params} size="small" />
              </>
            )}
          />
        </FieldWrapper>
      </Grid>
    </>
  );
};

export default CropSelectDropDown;
