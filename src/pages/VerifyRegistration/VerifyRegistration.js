import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardWrapper } from '../../components/PageLayout/Card';
import { Button, CircularProgress, Divider, Typography } from '@mui/material';
import theme from '../../utils/theme/theme.json';
import Copyright from '../../components/Copyright';
import { resendVerificationToken, verifyRegistration } from '../../redux/actions/verifyRegistration/action';
import { ActionWrapper } from '../../components/PageLayout/ActionWrapper';
import { useSnackBars } from '../../context/SnackBarContext';
import { SnackBarTypes } from '../../utils/constants/snackBarTypes';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import IosShareIcon from '@mui/icons-material/IosShare';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router';

const LogoSrc = require('../../assets/images/logo.png');

const VerifyRegistration = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [resending, setResending] = useState(false);
    const [resent, setResent] = useState(false);

    const navigate = useNavigate();

    const { addSnackBar } = useSnackBars();

    const onSuccess = () => {
        addSnackBar({
            type: SnackBarTypes.success,
            message: "Successfully Verified",
        });
        setLoading(false);
        setResending(false);
        setError(false);
        setResent(false);
        setSuccess(true);
    };

    const onError = (message) => {
        addSnackBar({
            type: SnackBarTypes.error,
            message: message || "Login Failed",
        });
        setLoading(false);
        setResending(false);
        setError(message);
        setResent(false);
        setSuccess(false);
    };

    const onSuccessResend = () => {
        addSnackBar({
            type: SnackBarTypes.success,
            message: "Verification Email Sent Successfully",
        });
        setLoading(false);
        setResending(false);
        setError("Verification Email Sent Successfully");
        setResent(false);
        setSuccess(false);
    };

    const verify = async () => {
        try {
            setLoading(true);
            await verifyRegistration(token, onSuccess, onError)
        } catch (error) {
            setLoading(false);
        }
    }

    const resend = async () => {
        try {
            setResending(true);
            await resendVerificationToken(token, onSuccessResend, onError);
        } catch (error) {
            setResending(false);
        }
    }

    useEffect(() => {
        verify();
    }, [])

    if (loading) {
        return (
            <Wrapper>
                <CardWrapperStyled>
                    <LogoWrapper>
                        <Logo src={LogoSrc} />
                    </LogoWrapper>
                    <TitleWrapper>
                        <CircularProgress size={24} sx={{ mr: '16px', color: theme.coreColors.secondary }} />
                        <Typography variant="h4">Verifying...</Typography>
                    </TitleWrapper>
                    <Typography>Please wait till the email verification completes.</Typography>
                    <Divider sx={{ mt: '24px', mb: '8px' }} />
                    <Copyright />
                </CardWrapperStyled>
            </Wrapper>
        );
    }

    if (success) {
        return (
            <Wrapper>
                <CardWrapperStyled>
                    <LogoWrapper>
                        <Logo src={LogoSrc} />
                    </LogoWrapper>
                    <TitleWrapper>
                        <CheckCircleIcon size={24} sx={{ mr: '16px' }} color="success" />
                        <Typography variant="h4">Verification Successful.</Typography>
                    </TitleWrapper>
                    <Typography>Your account successfully verified. You can now successfully login.</Typography>
                    <ActionWrapper isCeneter>
                        <Button
                            variant="text"
                            endIcon={
                                <ArrowRightIcon />
                            }
                            onClick={() => navigate('/login')}
                        >
                            Procced to login
                        </Button>
                    </ActionWrapper>
                    <Divider sx={{ mt: '24px', mb: '8px' }} />
                    <Copyright />
                </CardWrapperStyled>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <CardWrapperStyled>
                    <LogoWrapper>
                        <Logo src={LogoSrc} />
                    </LogoWrapper>
                    <TitleWrapper>
                        <CancelIcon size={24} sx={{ mr: '16px' }} color="error" />
                        <Typography variant="h4">{
                            resent ? "Verification Email Resent." : typeof error === 'string' ? error : "Verification Failed."
                        }</Typography>
                    </TitleWrapper>
                    {
                        resent ? (
                            <Typography>Check your email for new verification email.</Typography>
                        ) : (
                            <Typography>Your account verification failed. You can try again or request new token.</Typography>
                        )
                    }
                    <ActionWrapper isCeneter>
                        <Button
                            variant="text"
                            startIcon={
                                resending ? <CircularProgress size={16} color="inherit" /> : <IosShareIcon />
                            }
                            onClick={resend}
                            disabled={resending}
                        >
                            {
                                resending ? "Requesting..." : "Resend Token"
                            }
                        </Button>
                        <Button
                            variant="text"
                            startIcon={
                                <ReplayIcon />
                            }
                            onClick={verify}
                            disabled={resending}
                        >
                            Retry
                        </Button>
                    </ActionWrapper>
                    <Divider sx={{ mt: '24px', mb: '8px' }} />
                    <Copyright />
                </CardWrapperStyled>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <CardWrapperStyled>
                <LogoWrapper>
                    <Logo src={LogoSrc} />
                </LogoWrapper>
                <TitleWrapper>
                    <NewReleasesIcon size={32} sx={{ mr: '16px' }} color="warning" />
                    <Typography variant="h4">Verification Page.</Typography>
                </TitleWrapper>
                <Typography>Please press verify account to complete the verification process.</Typography>
                <ActionWrapper isCeneter>
                    <Button
                        variant="text"
                        endIcon={
                            <VerifiedIcon />
                        }
                        onClick={verify}
                        disabled={resending}
                    >
                        Verify Account
                    </Button>
                </ActionWrapper>
                <Divider sx={{ mt: '24px', mb: '8px' }} />
                <Copyright />
            </CardWrapperStyled>
        </Wrapper>
    );
}

export default VerifyRegistration;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: ${theme.coreColors.primary};
`;

const CardWrapperStyled = styled(CardWrapper)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center !important;
    min-width: 25vw;
    min-height: 20vh;
    padding-top: 16px;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
`;

const Logo = styled.img`
    width: 48px;
    height: 48px;
`;