import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useUserAccessValidation } from "../../../hooks/authentication";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../../utils/constants/permission";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { ActionWrapper } from "../../../components/PageLayout/ActionWrapper";
import { Button, ButtonGroup, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import ExportButton from "../../../components/ExportButton/ExportButton";
import PermissionWrapper from "../../../components/PermissionWrapper/PermissionWrapper";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { Fonts } from "../../../utils/constants/Fonts";
import VegitableEarlyWarningList from "./VegitableEarlyWarningList";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { getAllVegetableEarlyWarning, publishVegetableEarlyWarning } from "../../../redux/actions/cropLook/vegetableEarlyWarning/action";
import { cleanString } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
const VegetableEarlyWarning = () => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [warnings, setWarnings] = useState({});

  const selectVegeEarlyWarning = [];

  const onPublish = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: warnings?.isPublished === true ? `Successfully Unpublished` : `Successfully Published`,
    });
  };

  useEffect(() => {
    getAllVegetableEarlyWarning().then(({ dataList = [] }) => {
      console.log({dataList});
      let warning = dataList[0];
      console.log({warning});
      setWarnings(warning);
      console.log({warnings});
    })
  }, [open]);

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
        await publishVegetableEarlyWarning(onSuccess, onError);
      
      setLoading(false);
      close();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onDownload = async () => {
    try {
    //   await downloadVegetableEarlyWarningExcel();
    } catch (error) {
      console.error(error);
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
      <ListHeader title="Vegetable Early Warning" />
      <ActionWrapper isLeft>
      <Stack direction="row" spacing={1} sx={{ paddingTop:"2px"}}>
      <ExportButton onDownload={onDownload} />
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.VEGETABLE_EARLY_WARNING}`}
            >
              <Button onClick={onPublish} title={warnings?.isPublished === true ? "UnPublish" : "Publish"}	>
                {warnings?.isPublished === true ? "UnPublish" : "Publish"}
              </Button>
            </PermissionWrapper>
        </ButtonGroup>
         </Stack>
      </ActionWrapper>
      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.VEGETABLE_EARLY_WARNING}`}
      >
        {loading === false && (
          <VegitableEarlyWarningList />
        )}
      </PermissionWrapper>      

<ConfirmationDialog
        open={open}
        title="Do you want to Publish?"
        items={selectVegeEarlyWarning}
        loading={loading}
        onClose={close}
        onConfirm={onConfirm}
      />

    </div>
  );
};

export default VegetableEarlyWarning;
