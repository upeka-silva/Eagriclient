import React from 'react';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { ContainerTypes } from '../../utils/constants/containerTypes';


const ContainerWithBG = (props) => {
    const { background, type, overlayColor, ...rest } = props;
    switch (type) {
        case ContainerTypes.mui:
            return (
                <BGContainerMUI background={background} {...rest} />
            );
        case ContainerTypes.div:
        default:
            const overlay = overlayColor ? `linear-gradient(${overlayColor}), ` : '';
            return (
                <BGContainerDiv background={background} overlayColor={overlay} {...rest} />
            );
    }
}

export default ContainerWithBG;


const BGContainerMUI = styled(Container)`
    background-image: url(${props => props.background});
    background-position: center;
    background-size: cover;
`;

const BGContainerDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: ${props => props.overlayColor}url(${props => props.background});
    background-position: center;
    background-size: cover;
`;