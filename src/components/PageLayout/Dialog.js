import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide } from '@mui/material';
import styled from 'styled-components';
import { Colors } from '../../utils/constants/Colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({
    open = false,
    onClose = () => { },
    title = '',
    actions = null,
    children = null,
    ...props
}) => {
    return (
        <DialogStyled
            {...props}
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <CustomTitle>
                {title}
            </CustomTitle>
            {
                children &&
                <CustomContent>
                    {children}
                </CustomContent>
            }
            <CustomActionContainer>
                {actions}
            </CustomActionContainer>
        </DialogStyled>
    );
}

export default CustomDialog;

const DialogStyled = styled(Dialog)`
    & .MuiPaper-root {
        background-color: transparent !important;
        box-shadow: unset !important;
    }
`;

const CustomTitle = styled(DialogTitle)`
    background: ${Colors.white};
    box-shadow: ${Colors.shadow};
    border-radius: 10px;
    margin-bottom: 6px !important;
`;

const CustomContent = styled(DialogContent)`
    background: ${Colors.white};
    box-shadow: ${Colors.shadow};
    border-radius: 10px;
    padding-top: 6px !important;
    margin-top: 6px;
    margin-bottom: 6px;
`;

const CustomActionContainer = styled(DialogActions)`
    background: ${Colors.white};
    box-shadow: ${Colors.shadow};
    border-radius: 10px;
    margin-top: 6px;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
`;