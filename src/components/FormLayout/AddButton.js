import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const AddButton = styled.button`
  width: 100px;
  height: 28px;
  margin-right: 5px;
  border-radius: 22px;
  background-color: ${Colors.formButton};
  border: none;
  color: ${Colors.white};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
