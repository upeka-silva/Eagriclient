import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import styledComponents from "styled-components";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronDownIcon from "@mui/icons-material/ChevronRight";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Routes } from "../../routes/routes";
import { NavLink, useLocation } from "react-router-dom";
import {
  CollapseContainer,
  DrawerToggleButton,
  SideBarItemButton,
  SideBarItemToolTip,
} from "./Components";
import { Divider } from "@mui/material";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [openSecondery, setOpenSecondery] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSubRoute, setSelectedSubRoute] = useState(null);

  const toggleDrawer = () => {
    setOpen((current) => !current);
  };

  const location = useLocation();

  const isCurrentScreen = (paths = []) => {
    return paths.includes(location.pathname);
  };

  const renderSideBarRouteChildren = (parent) => {
    const { children = [] } = parent;
    return (
      <CollapseContainer
        key={children.length}
        in={selectedRoute === parent.name}
        timeout="auto"
        unmountOnExit
      >
        <List>
          {children
            .filter((r) => r.isSideBar === true)
            .map((r, key) => {
              if (r.children) {
                return (
                  <SideBarItemToolTip
                    title={!open ? r.name : ""}
                    placement="right"
                    arrow
                  >
                    <SideBarItemButton
                      selected={selectedSubRoute?.path === r.path}
                      onClick={() => {
                        setSelectedSubRoute(r);
                        setOpenSecondery(true);
                      }}
                    >
                      {r.icon && (
                        <ListItemIcon>{r.icon && <r.icon />}</ListItemIcon>
                      )}
                      <ListItemText
                        primary={r.name}
                        sx={{ textDecoration: "none !important" }}
                      />
                      <ListItemIcon sx={{ minWidth: "unset !important" }}>
                        <ChevronDownIcon sx={{ transform: "rotate(0deg)" }} />
                      </ListItemIcon>
                    </SideBarItemButton>
                  </SideBarItemToolTip>
                );
              }
              return (
                <SideBarItemToolTip
                  title={!open ? r.name : ""}
                  placement="right"
                  arrow
                >
                  <NavLink
                    key={key}
                    to={`${parent.path}${r.path}`}
                    style={{ textDecoration: "none !important" }}
                  >
                    <SideBarItemButton
                      selected={isCurrentScreen([`${parent.path}${r.path}`])}
                      onClick={() => {
                        setOpenSecondery(false);
                        setSelectedSubRoute(null);
                      }}
                    >
                      {r.icon && (
                        <ListItemIcon>{r.icon && <r.icon />}</ListItemIcon>
                      )}
                      <ListItemText
                        primary={r.name}
                        sx={{ textDecoration: "none !important" }}
                      />
                    </SideBarItemButton>
                  </NavLink>
                </SideBarItemToolTip>
              );
            })}
        </List>
      </CollapseContainer>
    );
  };

  const renderSideBarRoutes = () => {
    return Routes.filter((r) => r.isSideBar === true).map((r, key) => {
      if (r.children) {
        const toggleCollapseState = () => {
          setSelectedRoute((current) => (current === r.name ? null : r.name));
        };

        return (
          <>
            <SideBarItemToolTip
              title={!open ? r.name : ""}
              placement="right"
              arrow
            >
              <SideBarItemButton
                key={key}
                selected={
                  selectedRoute === r.name ||
                  r.children?.findIndex(
                    (c) => c.name === selectedSubRoute?.name
                  ) > -1
                }
                onClick={toggleCollapseState}
                haschildren={selectedRoute === r.name || undefined}
              >
                {r.icon && <ListItemIcon>{r.icon && <r.icon />}</ListItemIcon>}
                <ListItemText
                  primary={r.name}
                  sx={{ textDecoration: "none !important" }}
                />
                <ListItemIcon sx={{ minWidth: "unset !important" }}>
                  <ChevronDownIcon sx={{ transform: "rotate(90deg)" }} />
                </ListItemIcon>
              </SideBarItemButton>
            </SideBarItemToolTip>
            {renderSideBarRouteChildren(r)}
          </>
        );
      }
      return (
        <SideBarItemToolTip title={!open ? r.name : ""} placement="right" arrow>
          <NavLink
            to={r.path}
            style={{ textDecoration: "none !important" }}
            key={key}
          >
            <SideBarItemButton
              key={r.path + "-item-button"}
              selected={isCurrentScreen([r.path])}
              onClick={() => {
                setSelectedRoute(null);
                setSelectedSubRoute(null);
                setOpenSecondery(false);
              }}
            >
              {r.icon && <ListItemIcon>{r.icon && <r.icon />}</ListItemIcon>}
              <ListItemText
                primary={r.name}
                sx={{ textDecoration: "none !important" }}
              />
            </SideBarItemButton>
          </NavLink>
        </SideBarItemToolTip>
      );
    });
  };

  const renderSubRoutes = () => {
    if (selectedSubRoute != null) {
      const index = Routes.findIndex(
        (route) =>
          (route?.children || []).findIndex(
            (cr) => cr.path === selectedSubRoute.path
          ) > -1
      );
      const parentPath = `${Routes[index].path}${selectedSubRoute.path}`;
      return selectedSubRoute.children.map((r, key) => {
        if (r.isSideBar) {
          return (
            <SideBarItemToolTip
              title={!openSecondery ? r.name : ""}
              placement="right"
              arrow
            >
              <NavLink
                to={`${parentPath}${r.path}`}
                style={{ textDecoration: "none !important" }}
                key={key}
              >
                <SideBarItemButton
                  key={`${parentPath}${r.path}-item-button`}
                  selected={isCurrentScreen([`${parentPath}${r.path}`])}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary={r.name}
                    sx={{ textDecoration: "none !important" }}
                  />
                </SideBarItemButton>
              </NavLink>
            </SideBarItemToolTip>
          );
        }
        return null;
      });
    }

    return null;
  };
  let showSidebar;
  if (location.pathname === "/landing-page") {
    showSidebar = true;
  } else {
    showSidebar = false;
  }
  return showSidebar ? null : (
    <DrawerWrapper>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          {open && <Typography variant="h6">Agri E Extension</Typography>}
          <SideBarItemToolTip
            title={!open ? "Expand" : ""}
            placement="right"
            arrow
          >
            <DrawerToggleButton
              onClick={toggleDrawer}
              sx={{ background: "white" }}
            >
              {open ? <ChevronLeftIcon /> : <ViewListIcon />}
            </DrawerToggleButton>
          </SideBarItemToolTip>
        </Toolbar>
        {/* <Divider /> */}
        <List component="nav">{renderSideBarRoutes()}</List>
      </Drawer>
      {openSecondery && selectedSubRoute !== null ? (
        <SubDrawer variant="permanent" open={open && selectedSubRoute !== null}>
          <Toolbar>
            <Typography variant="h6">{selectedSubRoute?.name || ""}</Typography>
          </Toolbar>
          <Divider />
          <List component="nav">{renderSubRoutes()}</List>
        </SubDrawer>
      ) : null}
    </DrawerWrapper>
  );
};

export default SideBar;

const DrawerWrapper = styledComponents.div`
    display: flex;
    flex-direction: row;
`;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: 250,
    height: "100%",
    backgroundColor: "#FFF",
    border: "unset",
    borderRight: "1px solid #CCC",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingTop: "0px !important",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(6),
      },
    }),
  },
  "& .MuiToolbar-root .MuiTypography-root": {
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: 0,
    }),
  },
  "& .MuiToolbar-root .MuiButtonBase-root": {
    height: "38px",
    width: "38px",
  },
  "& .MuiToolbar-root": {
    ...(!open && {
      padding: "0px 0px 0px 4px !important",
    }),
  },
  "& .MuiButtonBase-root": {
    padding: "6px 8px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "40px",
  },
}));

const SubDrawer = styledComponents(Drawer)`
    background: #FFF;
    padding-top: 0px !important;
    width: auto !important;
    max-width: 300px;
    ${(props) =>
      props?.open ? "" : "max-width: 0px !important;\ntransition: 0.3 ease;"}

    & .MuiDrawer-paper {
        width: auto !important;
        max-width: 300px;
    }

    & .MuiToolbar-root .MuiTypography-root {
        // overflow-x: unset !important;
        // white-space: break-spaces;
    }

    & .MuiList-root {
        padding-top: 0px !important;
        padding-bottom: 0px !important;
    }
`;
