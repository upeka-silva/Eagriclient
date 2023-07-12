import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";


export const ActionButton = styled.button`
  width: 35px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid ${Colors.actionButtonBorderColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
