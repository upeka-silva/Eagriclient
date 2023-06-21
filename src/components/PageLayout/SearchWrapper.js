import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 25px 15px;
  border: 1px solid ${Colors.borderColor};
  border-radius: 3px;
  gap: 20px;
  margin-top: 10px;
`;
