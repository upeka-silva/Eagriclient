import {
  Collapse,
  IconButton,
  ListItemButton,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import theme from "../../utils/theme/theme.json";

export const DrawerToggleButton = styled(IconButton)`
  background: white !important;
  border-radius: 8px 8px 8px 8px !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1); 
`;

export const SideBarItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: space-between;
  border-radius: ${(props) =>
    props.haschildren ? "8px 8px 0px 0px" : "8px"} !important;
  background: ${(props) =>
    props.selected || props.haschildren
      ? Colors.baseColor
      : "white"} !important;
  color: ${(props) =>
    props.selected || props.haschildren ? "white !important" : "unset"};
  box-shadow: ${(props) => (props.selected ? "unset" : Colors.baseColor)};
  border-bottom: ${(props) =>
    props.selected
      ? "1px solid #FFF !important"
      : "1px solid #96E072 !important"};
  margin: 0px 0px 1px !important;
  transition: all 0.2s !important;

  &:hover {
    background: ${(props) =>
      props.selected || props.haschildren
        ? "unset"
        : theme.coreColors.primary + " !important"};
  }

  & .MuiSvgIcon-root {
    color: ${(props) =>
      props.selected || props.haschildren ? "white !important" : "unset"};
  }
`;

export const SideBarItemToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    top: -5,
  },
}));

export const CollapseContainer = styled(Collapse)`
  background: ${Colors.white};
  padding-bottom: 3px;
  border-bottom: 1px solid #96e072;
  z-index: 25000;

  & .MuiList-root {
    margin-left: 16px;
    padding: 0px !important;
    border-left: 1px solid #96e072;
  }

  & ${SideBarItemButton} {
    box-shadow: unset !important;
    border-radius: unset !important;
    margin-bottom: 0px;
  }

  & ${SideBarItemButton}:hover {
    transform: unset;
    box-shadow: ${Colors.shadow};
  }
`;