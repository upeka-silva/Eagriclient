import { Typography } from "@mui/material";
import React from "react";
import { Fonts } from "../../utils/constants/Fonts";

const ListHeader = ({ title }) => {
  return (
    <Typography
      variant="h6"
      fontWeight={500}
      mt={1}
      fontFamily={Fonts.fontStyle1}
    >
      {title}
    </Typography>
  );
};

export default ListHeader;
