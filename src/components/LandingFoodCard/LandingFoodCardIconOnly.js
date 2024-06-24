import { Star } from "@mui/icons-material";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import BestSelection from "../../assets/images/croplook/vegetableearlywarning/bestSelection.png";
import BetterSelection from "../../assets/images/croplook/vegetableearlywarning/BetterSelection.png";
import GoodSelection from "../../assets/images/croplook/vegetableearlywarning/GoodSelection.png";
import BadSelection from "../../assets/images/croplook/vegetableearlywarning/BadSelection.png";
import WorstSelection from "../../assets/images/croplook/vegetableearlywarning/WorstSelection.png";

function CustomRating({ value }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        style={{ fontSize: "1.7rem", color: i < value ? "gold" : "grey" }}
      />
    );
  }
  return <div>{stars}</div>;
}

function EmojiStatus({ status }) {
  if (status === "Best Selection") {
    return (
      <CardMedia
        component="img"
        image={BestSelection}
        alt="Best Selection"
        style={{ width: "100%", height: "auto" }}
      />
    );
  } else if (status === "Better Selection") {
    return (
      <CardMedia
        component="img"
        image={BetterSelection}
        alt="Better Selection"
        style={{ width: "100%", height: "auto" }}
      />
    );
  } else if (status === "Good Selection") {
    return (
      <CardMedia
        component="img"
        image={GoodSelection}
        alt="Good Selection"
        style={{ width: "100%", height: "auto" }}
      />
    );
  } else if (status === "Bad Selection") {
    return (
      <CardMedia
        component="img"
        image={BadSelection}
        alt="Bad Selection"
        style={{ width: "100%", height: "auto" }}
      />
    );
  } else if (status === "Worst Selection") {
    return (
      <CardMedia
        component="img"
        image={WorstSelection}
        alt="Worst Selection"
        style={{ width: "100%", height: "auto" }}
      />
    );
  }
}

function StartStatus({ status }) {
  if (status === "Best Selection") {
    return <CustomRating value={5} />;
  } else if (status === "Better Selection") {
    return <CustomRating value={4} />;
  } else if (status === "Good Selection") {
    return <CustomRating value={3} />;
  } else if (status === "Bad Selection") {
    return <CustomRating value={2} />;
  } else if (status === "Worst Selection") {
    return <CustomRating value={1} />;
  }
}

function ColorStatus({ status }) {
  if (status === "Best Selection") {
    return {
      backgroundColor: "#F0FFFA",
      footerColor: "#04A772",
    };
  } else if (status === "Better Selection") {
    return {
      backgroundColor: "#F9FFF6",
      footerColor: "#6ABA3F",
    };
  } else if (status === "Good Selection") {
    return {
      backgroundColor: "#FFFEF8",
      footerColor: "#F9CA0B",
    };
  } else if (status === "Bad Selection") {
    return {
      backgroundColor: "#FFF5ED",
      footerColor: "#FC7D0A",
    };
  } else if (status === "Worst Selection") {
    return {
      backgroundColor: "#FFF3F4",
      footerColor: "#D80A16",
    };
  }
}

function LandingFoodCardIconOnly({
  image,
  foodName,
  status,
  firstText,
  secondText,
}) {
  return (
    <div>
      <Grid>
        <Card
          sx={{
            maxWidth: 200,
            height: 300,
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: ColorStatus({ status })?.backgroundColor,
          }}
        >
          <Grid sx={{ padding: 2 }}>
            <EmojiStatus status={status} />
            <Grid mt={2} textAlign={"center"}>
              <StartStatus status={status} />
            </Grid>
          </Grid>

          {/* <Grid
            sx={{
              backgroundColor: ColorStatus({ status })?.footerColor,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto", // Push the footer content to the bottom
              borderRadius: "0 0 15px 15px", // Rounded bottom corners
              height: "60px",
              flexDirection: "row",
            }}
            px={2}
          >
            <Typography
              sx={{ color: "#fff", fontSize: "14px" }}
              variant="body2"
              color="text.secondary"
            >
              {status && status}
            </Typography>

            <Grid
              bgcolor="white"
              borderRadius="0 0 15px 0px"
              sx={{ marginRight: "-12px", padding: "5px" }}
            >
              <EmojiStatus status={status} />
            </Grid>
          </Grid> */}
        </Card>
      </Grid>
    </div>
  );
}

export default LandingFoodCardIconOnly;
