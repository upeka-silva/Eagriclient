import Stack from "@mui/material/Stack";
import styled from "styled-components";

export const ActionWrapper = styled(Stack)`
  && {
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) =>
      props?.isLeft ? "flex-start" : props?.isCeneter ? "center" : "flex-end"};
    padding: 8px 0px;
  }
`;

export const makeCapitalize = (str) => {
  return str?.toLowerCase();
};
