import { ArrowCircleLeftRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";
import { useTranslation } from "react-i18next";

function BackToList({ goBack }) {
  const { t } = useTranslation();
  return (
    <ActionWrapper isLeft>
      <Button
        variant="outlined"
        startIcon={<ArrowCircleLeftRounded />}
        onClick={goBack}
        color="success"
        size="small"
        sx={{
          height: '25px',
          fontSize: '13px',
          textTransform: 'capitalize',
          '& .MuiButton-startIcon': {
            marginRight: '4px'
          },
        }}
      >
        {t("action").back}
      </Button>
    </ActionWrapper>
  );
}
export default BackToList;
