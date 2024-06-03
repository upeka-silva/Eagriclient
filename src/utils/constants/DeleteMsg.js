import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DeleteMsg = () => {
  const {t} = useTranslation();
  return <Typography>{t("message.doYouWantToDelete")}</Typography>;
};

export default DeleteMsg;
