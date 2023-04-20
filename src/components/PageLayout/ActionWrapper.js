import styled from "styled-components";

export const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props?.isLeft ? 'flex-start' : 'flex-end'};
    padding: 8px 0px;
`;