import Button from "@mui/material/Button";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const AddButton = styled(Button)`
  && {
    width: 100px;
    height: 28px;
    margin-right: 5px;
    border: none;
    border-radius: 22px;
    background-color: ${Colors.formButton};
    color: ${Colors.white};
    font-size: 12px;
    line-height: 0px;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background-color: ${Colors.formButton};
      box-shadow: none;
    }
    &[disabled] {
      background-color: ${Colors.formButton};
      color: ${Colors.white};
    }
  }
`;
