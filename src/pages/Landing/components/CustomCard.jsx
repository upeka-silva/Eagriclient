import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CustomCard = ({ imageUrl, title, extent }) => {
  return (
    <Card
      style={{
        width: "330px",
        textAlign: "center",
        margin: "0px 10px 10px 10px",
        border: "2px solid #DBDBDB",
        boxShadow: "none",
        borderRadius: "15px",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1,  }}>
          <img
            style={{ width: "50px", height: "50px", margin: "auto" }}
            src={imageUrl}
          />
        </div>
        <div style={{ flex: 2, textAlign: 'left' }}>
            <Typography variant="h6">{title}</Typography>
            <Typography fontWeight={"bold"} color={"#2CB57B"} variant="h4">
                {extent}
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
