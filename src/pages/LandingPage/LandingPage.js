import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Farmer from "../../assets/images/farmer.png";
import { CardWrapper } from "../../components/PageLayout/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });
const productsData = {
  products: [
    {
      name: "GAP REQUEST",
      image_source_url: Farmer,
      description: "Description of Service 1",
    },
    {
      name: "SEED CERTIFICATION",
      image_source_url: Farmer,
      description: "Description of Service  2",
    },
    {
      name: "Service  3",
      image_source_url: Farmer,
      description: "Description of Service 3",
    },
    {
      name: "Service  4",
      image_source_url: Farmer,
      description: "Description of Service  4",
    },
    {
      name: "Service  5",
      image_source_url: Farmer,
      description: "Description of Service 5",
    },
  ],
};

const LandingPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CardWrapper>
        <h1>
          <strong>Hi Dinidu!</strong>
        </h1>
        <Typography level="display1">
          PLEASE SELECT THE AGRICULTURAL SERVICE
        </Typography>
        <Grid container sx={{ mt: 6 }} spacing={4}>
          {productsData.products.map((product, index) => (
            <Grid item xs={1} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 445,
                  borderRadius: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // Change the background color on hover
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 140, width: 140 }}
                  image={product.image_source_url}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardWrapper>
    </ThemeProvider>
  );
};

export default LandingPage;
