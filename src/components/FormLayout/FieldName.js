import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const FieldName = styled(Typography)`
  && {
    font-size: 11px;
    color: ${Colors.formButton};
    margin: 10px 0;
  }
`;
