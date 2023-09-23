import React, { useState } from "react";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import { AddButton } from "../../components/FormLayout/AddButton";
import { ResetButton } from "../../components/FormLayout/ResetButton";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import CropDetailsDialog from "./CropSeasonDialog/CropSeasonDialog";
import CropAreaAddDialog from "./CropAreaAddDialog/CropAreaAddDialog";
import CropAreaViewDialog from "./CropAreaViewDialog/CropAreaViewDialog";
import { Fonts } from "../../utils/constants/Fonts";
import GapCropDetails from "./gapCropDetails";

export default function CropDetails({ actionMode, gapReqId }) {

  return (
    <div>
      <GapCropDetails actionMode={actionMode} gapReqId = {gapReqId}/>
    </div>
  );
}
