import React, { useState } from 'react';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { Routes } from '../../routes/routes';
import { Button, IconButton, Popover, Typography } from '@mui/material';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import ExitIcon from '@mui/icons-material/ExitToApp';
import { Colors } from '../../utils/constants/Colors';
import theme from '../../utils/theme/theme.json';

const AppHeader = () => {
    const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
    const [anchorElement, setAnchorEl] = React.useState(null);

    const openProfileOptions = (event) => {
        setProfileOptionsOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const closeProfileOptions = () => {
        setProfileOptionsOpen(false);
        setAnchorEl(null);
    }

    const id = isProfileOptionsOpen ? 'simple-popover' : undefined;

    const location = useLocation();

    const getCurrentScreenName = () => {
        let screenName = '';
        const r = (Routes.find(r => r.path === location.pathname || (r?.children || []).map(cr => `${r.path}${cr?.path}`).includes(location.pathname)) || {});
        if (r.children) {
            screenName = `${r.name} ● ${(r.children.find(cr => `${r.path}${cr?.path}` === location.pathname) || {})?.name}` || '';
        } else {
            screenName = r?.name || '';
        }
        return screenName;
    }

    const getPathName = () => {
        return location.pathname === '/' || !location.pathname ? "" : location.pathname;
    }

    return (
        <Wrapper>
            <ItemWrapper>
                <div>
                    <Typography variant="h6">
                        {getCurrentScreenName()}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: `${theme.coreColors.primary}` }}>
                        {getPathName()}
                    </Typography>
                </div>
                <IconButton onClick={openProfileOptions}>
                    <ProfileIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={isProfileOptionsOpen}
                    anchorEl={anchorElement}
                    onClose={closeProfileOptions}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div>
                        <Button variant={theme} startIcon={<ProfileIcon />}>
                            Profile
                        </Button>
                        <br />
                        <Button variant={theme} startIcon={<ExitIcon />}>
                            Logout
                        </Button>
                    </div>
                </Popover>
            </ItemWrapper>
        </Wrapper>
    );
}

export default AppHeader;

const Wrapper = styled(Card)`
    display: block;
    min-height: 53px;
    margin: 12px 0px;
    padding: 12px;
    border-radius: 12px !important;
    box-shadow: ${Colors.shadow};
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;