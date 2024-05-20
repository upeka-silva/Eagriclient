import React from "react";
import Brinjol from "../../../../assets/images/brinjal.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import VegitableEarlyWarningFoodCard from "../../../../components/VegitableEarlyWarning/VegitableEarlyWarningFoodCard";
import { Grid, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "styled-components";
import "./VegitableEarlyWarningCarousel.css";

const StyledSlider = styled(Slider)`
  &.slider-container .slider {
    overflow: initial;
  }
`;

function VegitableEarlyWarningCarousel({ status, dataList }) {
  return (
    <div>
      <Grid container spacing={2} display="flex">
        {/* Render cards */}

        {
        
        dataList[0]?.isPublished === true
          && dataList.map((card, index) => (
              <Grid key={index} item mb={5}>
                <VegitableEarlyWarningFoodCard
                  image={card?.cropDTO.prsignedUrl}
                  foodName={card?.cropDTO?.description}
                  status={status}
                  firstText={card.accumulatedExtend}
                  secondText={card.accumulatedExtend}
                />
              </Grid>
            ))
         }
      </Grid>
    </div>
  );
}

export default VegitableEarlyWarningCarousel;
