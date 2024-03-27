import { Star } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function CustomRating({ value }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        style={{ fontSize: "1.5rem", color: i < value ? "gold" : "grey" }}
      />
    );
  }
  return <div>{stars}</div>;
}

function EmojiStatus({ status }) {
  if (status === "Best Selection") {
    return <SentimentVerySatisfiedIcon style={{ fontSize: 40, color: ColorStatus({ status })?.footerColor, }} />;
  } else if (status === "Better Selection") {
    return <SentimentSatisfiedIcon style={{ fontSize: 40, color: ColorStatus({ status })?.footerColor, }} />;
  } else if (status === "Good Selection") {
    return <SentimentSatisfiedAltIcon style={{ fontSize: 40, color: ColorStatus({ status })?.footerColor, }} />;
  } else if (status === "Bad Selection") {
    return <SentimentDissatisfiedIcon style={{ fontSize: 40, color: ColorStatus({ status })?.footerColor, }} />;
  } else if (status === "Worst Selection") {
    return <SentimentVeryDissatisfiedIcon style={{ fontSize: 40, color: ColorStatus({ status })?.footerColor, }} />;
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
      backgroundColor: "#04A772",
      footerColor: "#C4EFCA",
    };
  } else if (status === "Better Selection") {
    return {
      backgroundColor: "#FFFEF8",
      footerColor: "#F9CA0B",
    };
  } else if (status === "Good Selection") {
    return {
      backgroundColor: "#F9FFF6",
      footerColor: "#6ABA3F",
    };
  } else if (status === "Bad Selection") {
    return {
      backgroundColor: "orange",
      footerColor: "orange",
    };
  } else if (status === "Worst Selection") {
    return {
      backgroundColor: "#FFF3F4",
      footerColor: "#D80A16",
    };
  }
}

function LandingFoodCard({ image, foodName, status }) {
  

  return (
    <div>
      <Grid>
        <Card
          sx={{
            maxWidth: 220,
            height: 350,
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: ColorStatus({ status })?.backgroundColor,
          }}
        >
          <Grid sx={{ padding: 2 }}>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              height="140"
              image={image}
              alt="food image"
            />
            <Grid mt={2}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                fontWeight={"bold"}
              >
                {foodName}
              </Typography>
              <StartStatus status={status} />
            </Grid>
            <Typography mt={1} fontSize={"13px"} color="text.secondary">
              Cul.Ext -156.46 ha.
            </Typography>
            <Typography mt={1} fontSize={"13px"} color="text.secondary">
              Available Cul.Ext - 156.46 ha.
            </Typography>
          </Grid>

          <Grid
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
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}

export default LandingFoodCard;
