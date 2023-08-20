import Button from "@mui/material/Button";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const ResetButton = styled(Button)`
  && {
    width: 100px;
    height: 28px;
    border: 1px solid #434343;
    border-radius: 22px;
    background-color: ${Colors.white};
    color: ${Colors.formFieldName};
    font-size: 12px;
    line-height: 0px;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background-color: ${Colors.white};
      border: 1px solid #434343;
    }
  }
`;
