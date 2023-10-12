import React, { useEffect, useState } from "react";
import MultiSelectTils from "../../components/MultiSelectTiles/multi-select-tiles";
import { Factory } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

const CropRegistrationTab = () => {
  const [selectedCrops, setSelectedCrops] = useState([]);

  const handleSelectedCrops = (cropId, selected) => {
    if (selected) {
      setSelectedCrops([...selectedCrops, cropId]);
    } else {
      setSelectedCrops(selectedCrops.filter((id) => id !== cropId));
    }
  };

  useEffect(() => {
    console.log("selected crops ------->");
    console.log(selectedCrops);
  }, [selectedCrops]);

  const options1 = [
    {
      id: 1,
      name: "option 1",
      imageUrl: Factory,
    },
    {
      id: 2,
      name: "option 2",
      imageUrl: Factory,
    },
    {
      id: 3,
      name: "option 3",
      imageUrl: Factory,
    },
    {
      id: 4,
      name: "option 4",
      imageUrl: Factory,
    },
    {
      id: 5,
      name: "option 5",
      imageUrl: Factory,
    },
    {
      id: 6,
      name: "option 6",
      imageUrl: Factory,
    },
    {
      id: 7,
      name: "option 7",
      imageUrl: Factory,
    },
    {
      id: 8,
      name: "option 8",
      imageUrl: Factory,
    },
  ];

  const handleCropClear = () => {};
  const handleCropUpdate = () => {};
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            color="success"
            size="small"
            onClick={handleCropClear}
            sx={{ marginTop: "10px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleCropUpdate}
            sx={{ marginTop: "10px" }}
          >
            Update
          </Button>
        </div>
      </Grid>
      <Grid item sm={12} md={12} lg={12} sx={{marginTop: "10px"}}>
        <MultiSelectTils
          options={options1}
          handleSelectedValues={handleSelectedCrops}
        />
      </Grid>
    </Grid>
  );
};

export default CropRegistrationTab;
