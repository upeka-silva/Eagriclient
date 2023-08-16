// ServiceCard.js

import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SideBar from "../../components/SideBar/SideBar";
import { useServiceContext } from "../../context/ServiceContext";

const ServiceCard = ({ service, onClick }) => {
  // const { setService } = useServiceContext();

  const handleCardClick = () => {
    // setService(product.service); // Set the service in the global store
    onClick(); // Call the onClick function if needed
  };

  return (
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
      onClick={handleCardClick} // Use the modified click handler
    >
      <CardMedia
        sx={{ height: 140, width: 140 }}
        image={""}
        title="green iguana"
      />
      {/* <SideBar /> */}
      {/* You can add the SideBar component here if needed */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
