import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { get } from "../../services/api";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Colors } from "../../utils/constants/Colors";
import { DEF_ACTIONS } from "../../utils/constants/permission";

const CropSelectDropDown = (props) => {
  const { selectedCropCallback, selectedVarietyCallback, mode } = props;

  const [cropCategories, setCropCategories] = useState([]);
  const [selectedCropCategory, setSelectedCropCategory] = useState("");

  const [cropSubCategories, setCropSubCategories] = useState([]);
  const [selectedCropSubCategory, setSelectedCropSubCategory] = useState("");

  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");

  const [cropVarieties, setCropVarieties] = useState([]);
  const [selectedCropVariety, setSelectedCropVariety] = useState("");

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
      fetchCropVarity("geo-data/crop-varieties/crop", selectedCrop);
    } else {
      // Clear the crop varieties if no crop is selected
      setCropVarieties([]);
    }
  }, [selectedCrop]);

  return (
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
            value={selectedCropCategory}
            disabled={mode === DEF_ACTIONS.VIEW}
            onChange={(e) => setSelectedCropCategory(e?.target?.value)}
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
            {cropCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryId}
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
            //disabled={mode === DEF_ACTIONS.VIEW}
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
                {cropSub.subCategoryId}
              </MenuItem>
            ))}
          </Select>
        </FieldWrapper>
      </Grid>
      <Grid item sm={12} md={12} lg={6}>
        <FieldWrapper>
          <FieldName
            style={{
              width: "100%",
            }}
          >
            Crop
          </FieldName>

          <Select
            name="questionType"
            id="questionType"
            value={selectedCrop}
            //disabled={mode === DEF_ACTIONS.VIEW}
            onChange={(e) => {
              setSelectedCrop(e?.target?.value);
              selectedCropCallback(e?.target?.value);
            }}
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
            {crops.map((crop) => (
              <MenuItem key={crop.id} value={crop.id}>
                {crop.description}
              </MenuItem>
            ))}
          </Select>
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

          <Select
            name="questionType"
            id="questionType"
            value={selectedCropVariety}
            //disabled={mode === DEF_ACTIONS.VIEW}
            onChange={(e) => {
              setSelectedCropVariety(e?.target?.value);
              selectedVarietyCallback(e?.target?.value);
            }}
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
            {cropVarieties.map((variety) => (
              <MenuItem key={variety.id} value={variety.id}>
                {variety.varietyId}
              </MenuItem>
            ))}
          </Select>
        </FieldWrapper>
      </Grid>
    </>
  );
};

export default CropSelectDropDown;
