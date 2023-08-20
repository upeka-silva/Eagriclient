import styled from "styled-components";

export const ActionWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props?.isLeft ? "flex-start" : props?.isCeneter ? "center" : "flex-end"};
  padding: 8px 0px;
`;

export const makeCapitalize = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1).toLowerCase();
};