import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const ResetButton = styled.button`
  width: 100px;
  height: 28px;
  color: ${Colors.formFieldName};
  background-color: ${Colors.white};
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #434343;
  border-radius: 22px;
  cursor: pointer;
`;
