import { ArrowCircleLeftRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { ActionWrapper } from "../PageLayout/ActionWrapper";

function BackToList({ goBack }) {
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
          width: '26px',
          fontSize: '13px',
          textTransform: 'capitalize',
          '& .MuiButton-startIcon': {
            marginRight: '4px'
          },
        }}
      >
        Back
      </Button>
    </ActionWrapper>
  );
}
export default BackToList;
