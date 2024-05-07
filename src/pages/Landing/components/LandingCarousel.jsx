import React, { useEffect } from "react";
import Brinjol from "../../../assets/images/brinjal.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LandingFoodCard from "../../../components/LandingFoodCard/LandingFoodCard";
import { Grid, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "styled-components";
import "./LandingCarousel.css";
import { get_vegetable_early_warnings } from "../../../redux/actions/vegwarning/action";
import VegesampleImg from "../../../assets/images/vegetable_placeholder.png";

const StyledSlider = styled(Slider)`
  &.slider-container .slider {
    overflow: initial;
  }
`;

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow arrow-left">
      <IconButton onClick={onClick}>
        <ChevronLeft style={{ fontSize: "30px" }} />
      </IconButton>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow arrow-right">
      <IconButton onClick={onClick}>
        <ChevronRight style={{ fontSize: "30px" }} />
      </IconButton>
    </div>
  );
};

function LandingCarousel({ status,data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Show 5 cards in the first slide
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1840,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1266,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const cardsData = [
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    {
      image: Brinjol,
      foodName: "Brinjal",
      status: "Better Selection",
      firstText: "Cul.Ext -156.46 ha.",
      secondText: "Available Cul.Ext - 156.46 ha.",
    },
    // Add more card data as needed
  ];



  return (
    <div>
      <StyledSlider StyledSlider {...settings} className="slider-container">
        {/* Render cards */}
        {
          data?.map((card, index) => (
            <Grid key={index} item mb={5}>
              <LandingFoodCard
                image={card?.cropDTO?.prsignedUrl ? card?.cropDTO?.prsignedUrl : VegesampleImg}
                foodName={card?.cropDTO?.description}
                status={status}
                firstText={"Cul.Ext -" + card?.accumulatedExtend}
                secondText={"Available Cul.Ext - " + card?.accumulatedExtend}
              />
            </Grid>
          ))}
      </StyledSlider>
    </div>
  );
}

export default LandingCarousel;
