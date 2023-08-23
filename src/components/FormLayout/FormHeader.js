import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";

export const FormHeader = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 500;
    color: ${Colors.black};
    padding: 4px 0px 4px 6px;
    font-family: ${Fonts.fontStyle1};
  }
`;
