import { Typography } from "@mui/material";
import React from "react";
import { Fonts } from "../../utils/constants/Fonts";
import { useTranslation } from "react-i18next";

const ListHeader = ({ title }) => {
  const { t } = useTranslation();
  return (
    <Typography
      variant="h6"
      fontWeight={500}
      mt={1}
      fontFamily={Fonts.fontStyle1}
    >
      {t(title)}
      {/* {title} */}
    </Typography>
  );
};

export default ListHeader;
