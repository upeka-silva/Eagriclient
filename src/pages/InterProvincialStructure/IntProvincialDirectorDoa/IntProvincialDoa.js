import React, { useState } from "react";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useNavigate } from "react-router-dom";
import { useSnackBars } from "../../../context/SnackBarContext";
import {
  DEF_ACTIONS,
  DEF_COMPONENTS,
} from "../../../utils/constants/permission";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { ActionButton } from "../../../components/ActionButtons/ActionButton";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogBox from "../../../components/PageLayout/DialogBox";
import DeleteMsg from "../../../utils/constants/DeleteMsg";
import { deleteProvincialDoa } from "../../../redux/actions/ProvincialDoa/action";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import IntProvincialDoaList from "./IntProvincialDoaList";
import { deleteInterProvincialDoa } from "../../../redux/actions/interProvincialDoa/action";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { Fonts } from "../../../utils/constants/Fonts";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";


const IntProvincialDoa = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState({});

  const [dataEndPoint,setDataEndPoint] = useState("geo-data/director-doa")
  const [selectedProvincialDoa, setSelectedProvincialDoa] = useState([]);
  const [dialogSelectedProvincialDoa, setDialogSelectedProvincialDoa] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  const toggleProvincialDoaSelect = (component) => {
    setSelectedProvincialDoa((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
  };

  const selectAllProvincialDoa = (all = []) => {
    setSelectedProvincialDoa(all);
  };

  const resetSelectedProvincialDoa = () => {
    setSelectedProvincialDoa([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/zone/inter-provincial-structure/inter-provincial-doa-form", {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/zone/inter-provincial-structure/inter-provincial-doa-form", {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectedProvincialDoa[0] || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/zone/inter-provincial-structure/inter-provincial-doa-form", {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectedProvincialDoa[0] || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
    setDialogSelectedProvincialDoa(selectedProvincialDoa);
  };

  const onClose = () => {
    setOpen(false);
    setDialogSelectedProvincialDoa([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedProvincialDoa.map((item) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {" "}
                {item?.proDirectorId} - {item?.description}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Successfully deleted",
    });
  };

  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "Failed to delete",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const provincialDoa of dialogSelectedProvincialDoa) {
        await deleteInterProvincialDoa(provincialDoa.id, onSuccess, onError);
      }
      setLoading(false);
      onClose();
      resetSelectedProvincialDoa();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      fontFamily: `${Fonts.fontStyle1}`,
      marginTop: "10px",
      height: "90vh",
      overflowY: "scroll",
    }}
    >
      <ListHeader title="Director DOA" />
      <ActionWrapper isLeft>
      <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
        <PermissionWrapper
          permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.DIRECTOR_DOA}`}
        >
          <Button  onClick={onCreate}>
          <Add/>
            {DEF_ACTIONS.ADD}
          </Button>
        </PermissionWrapper>

        {selectedProvincialDoa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.DIRECTOR_DOA}`}
          >
            <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
          </PermissionWrapper>
        )}
        {selectedProvincialDoa.length === 1 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.DIRECTOR_DOA}`}
          >
            <Button onClick={onView}>
              <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
          </PermissionWrapper>
        )}
        {selectedProvincialDoa.length > 0 && (
          <PermissionWrapper
            permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.DIRECTOR_DOA}`}
          >
            <Button onClick={onDelete}>
                
                <Delete/>
                {DEF_ACTIONS.DELETE}
              </Button>
          </PermissionWrapper>
        )}
        </ButtonGroup>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.DIRECTOR_DOA}`}
      >
        {loading === false && (
          <IntProvincialDoaList
            selectedRows={selectedProvincialDoa}
            onRowSelect={toggleProvincialDoaSelect}
            selectAll={selectAllProvincialDoa}
            unSelectAll={resetSelectedProvincialDoa}
            dataEndPoint={dataEndPoint}
          />
        )}
      </PermissionWrapper>

      <ConfirmationDialog
        open={open}
        title="Do you want to delete?"
        items={selectedProvincialDoa}
        loading={loading}
        onClose={onClose}
        onConfirm={onConfirm}
        setDialogSelectedTypes={setDialogSelectedProvincialDoa}
        dialogSelectedTypes={dialogSelectedProvincialDoa}
        propertyId = "doaId"
        propertyDescription = "description"
      />
    </div>
  );
};

export default IntProvincialDoa;
