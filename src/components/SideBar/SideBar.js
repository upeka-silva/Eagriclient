import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import styledComponents from "styled-components";
import {
  Drawer as MuiDrawer,
  Toolbar,
  List,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronDownIcon from "@mui/icons-material/ChevronRight";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Routes } from "../../routes/routes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CollapseContainer,
  DrawerToggleButton,
  SideBarItemButton,
  SideBarItemToolTip,
} from "./Components";
import { getUserPermissionForLeftNav } from "../../utils/helpers/permission";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [openSecondary, setOpenSecondary] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSubRoute, setSelectedSubRoute] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setOpen((current) => !current);
  };
  const [loading, setLoading] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const location = useLocation();

  const isCurrentScreen = (paths = []) => {
    return paths.includes(location.pathname);
  };

  useEffect(() => {
    const getFilteredRoutes = async () => {
      const filteredRoutes = await Promise.all(
        Routes.map(async (r) => {
          if (r?.isSideBar === true && r?.component) {
            const p = await getUserPermissionForLeftNav(r.component);

            if (!p.isEnabled) {
              return null; // returning null for routes to be filtered out
            }
          }
          if (r?.children && r?.isSideBar === true) {
            const filteredChildren = await Promise.all(
              r?.children.map(async (c) => {
                if (c?.isSideBar === true && c?.component) {
                  const p = await getUserPermissionForLeftNav(c.component);
                  if (!p.isEnabled) {
                    return null; // returning null for routes to be filtered out
                  }
                }
                if (c?.isSideBar === true && c?.children) {
                  const filteredChildren = await Promise.all(
                    c?.children.map(async (cc) => {
                      if (cc?.isSideBar === true && cc?.component) {
                        const p = await getUserPermissionForLeftNav(
                          cc?.component
                        );
                        if (!p.isEnabled) {
                          return null;
                        }
                      }
                      return cc;
                    })
                  );
                  if (!filteredChildren.some((c) => c?.isSideBar)) {
                    return null;
                  }
                  c.children = filteredChildren;
                }
                return c;
              })
            );

            if (!filteredChildren.some((c) => c?.isSideBar)) {
              return null;
            }
            r.children = filteredChildren;
          }

          return r; // keep the route in the array
        })
      );

      setFilteredRoutes(filteredRoutes);
    };
    getFilteredRoutes();
    setLoading(true);
  }, []);

  const renderSideBarRouteChildren = (parent) => {
    const { children = [] } = parent;
    return (
      <CollapseContainer
        key={children.length}
        in={selectedRoute === parent.name && open === true ? true : false}
        timeout="auto"
        unmountOnExit
      >
        <List>
          {children
            .filter((r) => r?.isSideBar === true)
            .map((r, key) => {
              if (r?.children) {
                return (
                  <SideBarItemToolTip
                    title={!open ? t(r?.name) : ""}
                    placement="right"
                    arrow
                    key={key}
                  >
                    <SideBarItemButton
                      selected={selectedSubRoute?.path === r?.path}
                      onClick={() => {
                        setSelectedSubRoute(r);
                        setOpenSecondary(true);
                        if (r?.parentPath) {
                          navigate(r?.parentPath);
                        }
                      }}
                    >
                      {r.icon && <ListItemIcon>{<r.icon />}</ListItemIcon>}
                      <ListItemText
                        primary={t(r?.name)}
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
                  key={key}
                >
                  <NavLink
                    to={`${parent.path}${r.path}`}
                    style={{ textDecoration: "none !important" }}
                  >
                    <SideBarItemButton
                      selected={isCurrentScreen([`${parent.path}${r.path}`])}
                      onClick={() => {
                        setOpenSecondary(false);
                        setSelectedSubRoute(null);
                      }}
                    >
                      {r.icon && <ListItemIcon>{<r.icon />}</ListItemIcon>}
                      <ListItemText
                        primary={t(r.name)}
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
    //TODO: Add this condition later: r.isService === service

    return filteredRoutes
      .filter((r) => r?.isSideBar === true)
      .map((r, key) => {
        if (r.children) {
          const toggleCollapseState = () => {
            setSelectedRoute((current) =>
              current === r?.name ? null : r?.name
            );
            setOpen(true);
          };

          return (
            <React.Fragment key={key}>
              <SideBarItemToolTip
                title={!open ? t(r.name) : ""}
                placement="right"
                arrow
              >
                <SideBarItemButton
                  key={key}
                  selected={
                    selectedRoute === r?.name ||
                    r?.children?.findIndex(
                      (c) => c?.name === selectedSubRoute?.name
                    ) > -1
                  }
                  onClick={toggleCollapseState}
                  haschildren={selectedRoute === r?.name || undefined}
                >
                  {r.icon && <ListItemIcon>{<r.icon />}</ListItemIcon>}
                  <ListItemText
                    primary={t(r.name)}
                    sx={{ textDecoration: "none !important" }}
                  />
                  <ListItemIcon sx={{ minWidth: "unset !important" }}>
                    <ChevronDownIcon sx={{ transform: "rotate(90deg)" }} />
                  </ListItemIcon>
                </SideBarItemButton>
              </SideBarItemToolTip>
              {loading === true && renderSideBarRouteChildren(r)}
            </React.Fragment>
          );
        }
        return (
          <SideBarItemToolTip
            title={!open ? r.name : ""}
            placement="right"
            arrow
            key={key}
          >
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
                  setOpenSecondary(false);
                }}
              >
                {r.icon && <ListItemIcon>{<r.icon />}</ListItemIcon>}
                <ListItemText
                  primary={t(r.name)}
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
            (cr) => cr?.path === selectedSubRoute.path
          ) > -1
      );
      const parentPath = `${Routes[index].path}${selectedSubRoute.path}`;
      return selectedSubRoute.children.map((r, key) => {
        if (r?.isSideBar) {
          return (
            <SideBarItemToolTip
              title={!openSecondary ? t(r.name) : ""}
              placement="right"
              arrow
              key={key}
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
                  <ListItemIcon />
                  <ListItemText
                    primary={t(r.name)}
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

  const hideSidebar =
    location.pathname === "/landing-page" ||
    /^\/gap-details\/\d+$/.test(location.pathname);
  return hideSidebar ? null : (
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
          {open && (
            <Typography variant="h4" fontWeight="bold">
              CROPIX
            </Typography>
          )}
          <SideBarItemToolTip
            title={!open ? "Expand" : ""}
            placement="right"
            arrow
          >
            <DrawerToggleButton
              onClick={toggleDrawer}
              sx={{ height: "38px !important", width: "38px !important" }}
            >
              {open ? <ChevronLeftIcon /> : <ViewListIcon />}
            </DrawerToggleButton>
          </SideBarItemToolTip>
        </Toolbar>
        <Divider />
        <List
          component="nav"
          sx={{
            overflowY: "auto",
            margin: 0,
            padding: 1,
            fontSize: 12,
            listStyle: "none",
            height: "100%",
            "&::-webkit-scrollbar": {
              width: "0.4em",
              border: "ActiveBorder",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px #3E9D4B",
              webkitBoxShadow: "inset 0 0 6px #3E9D4B",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#3E9D4B",
              outline: "1px solid slategrey",
            },
          }}
        >
          {loading === true && renderSideBarRoutes()}
        </List>
      </Drawer>
      {openSecondary && selectedSubRoute !== null ? (
        <SubDrawer variant="permanent" open={open && selectedSubRoute !== null}>
          <Toolbar>
            <Typography variant="h7">
              {t(selectedSubRoute?.name) || ""}
            </Typography>
          </Toolbar>
          <Divider />
          <List component="nav">{loading === true && renderSubRoutes()}</List>
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
    height: "34px",
    width: "38px",
  },
  "& .MuiToolbar-root": {
    ...(!open && {
      padding: "0px 0px 0px 2px !important",
    }),
  },
  "& .MuiButtonBase-root": {
    padding: "2px 6px",
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
