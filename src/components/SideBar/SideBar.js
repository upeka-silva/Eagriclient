import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronDownIcon from '@mui/icons-material/ChevronRight';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Routes } from '../../routes/routes';
import { NavLink, useLocation } from 'react-router-dom';
import { CollapseContainer, DrawerToggleButton, SideBarItemButton, SideBarItemToolTip } from './Components';

const SideBar = () => {

    const [open, setOpen] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const toggleDrawer = () => {
        setOpen(current => !current);
    }

    const location = useLocation();

    const isCurrentScreen = (paths = []) => {
        return paths.includes(location.pathname);
    }

    const renderSideBarRouteChildren = (parent) => {
        const { children = [] } = parent;
        return (
            <CollapseContainer
                key={children.length}
                in={selectedRoute === parent.name}
                timeout='auto'
                unmountOnExit
            >
                <List>
                    {
                        children.map((r, key) => (
                            <SideBarItemToolTip title={!open ? r.name : ''} placement="right" arrow>
                                <NavLink key={key} to={`${parent.path}${r.path}`} style={{ textDecoration: 'none !important' }}>
                                    <SideBarItemButton selected={isCurrentScreen([`${parent.path}${r.path}`])}>
                                        <ListItemIcon>
                                            {r.icon && <r.icon />}
                                        </ListItemIcon>
                                        <ListItemText primary={r.name} sx={{ textDecoration: 'none !important' }} />
                                    </SideBarItemButton>
                                </NavLink>
                            </SideBarItemToolTip>
                        ))
                    }
                </List>
            </CollapseContainer>
        );
    }

    const renderSideBarRoutes = () => {
        return Routes.filter(r => r.isSideBar === true).map((r, key) => {
            if (r.children) {
                const toggleCollapseState = () => {
                    setSelectedRoute(current => current === r.name ? null : r.name)
                }
                return (
                    <>
                        <SideBarItemToolTip title={!open ? r.name : ''} placement="right" arrow>
                            <SideBarItemButton
                                key={key}
                                selected={isCurrentScreen(r.children.map((c) => `${r.path}${c.path}`))}
                                onClick={toggleCollapseState}
                                haschildren={selectedRoute === r.name || undefined}
                            >
                                <ListItemIcon>
                                    {r.icon && <r.icon />}
                                </ListItemIcon>
                                <ListItemText primary={r.name} sx={{ textDecoration: 'none !important' }} />
                                <ListItemIcon sx={{ minWidth: "unset !important" }}>
                                    <ChevronDownIcon sx={{ transform: 'rotate(90deg)' }} />
                                </ListItemIcon>
                            </SideBarItemButton>
                        </SideBarItemToolTip>
                        {renderSideBarRouteChildren(r)}
                    </>
                );
            }
            return (
                <SideBarItemToolTip title={!open ? r.name : ''} placement="right" arrow>
                    <NavLink to={r.path} style={{ textDecoration: 'none !important' }} key={key}>
                        <SideBarItemButton key={r.path + "-item-button"} selected={isCurrentScreen([r.path])} onClick={() => setSelectedRoute(null)}>
                            <ListItemIcon>
                                {r.icon && <r.icon />}
                            </ListItemIcon>
                            <ListItemText primary={r.name} sx={{ textDecoration: 'none !important' }} />
                        </SideBarItemButton>
                    </NavLink>
                </SideBarItemToolTip>
            )
        })
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                }}
            >
                <Typography variant="h6">Agri E Extension</Typography>
                <SideBarItemToolTip title={!open ? 'Expand' : ''} placement="right" arrow>
                    <DrawerToggleButton onClick={toggleDrawer} sx={{ background: "white" }}>
                        {
                            open ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ViewListIcon />
                            )
                        }
                    </DrawerToggleButton>
                </SideBarItemToolTip>
            </Toolbar>
            {/* <Divider /> */}
            <List component="nav">
                {renderSideBarRoutes()}
            </List>
        </Drawer>
    );
}

export default SideBar;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            marginLeft: 12,
            marginRight: 12,
            marginTop: 12,
            marginBottom: 12,
            paddingLeft: 5,
            paddingRight: 5,
            width: 250,
            height: "calc(100% - 24px)",
            backgroundColor: '#FFF0',
            border: 'unset',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(8),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(8),
                },
            }),
        },
        '& .MuiToolbar-root .MuiTypography-root': {
            ...(!open && {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
                width: 0,
            })
        }
    }),
);
