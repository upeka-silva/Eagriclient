import { ArrowCircleLeftRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";

function BackToList({goBack}) {
  return (
    <ActionWrapper isLeft>
      <Button
        startIcon={<ArrowCircleLeftRounded />}
        onClick={goBack}
        color="success"
      >
        Back to List
      </Button>
    </ActionWrapper>
  );
}
export default BackToList;
