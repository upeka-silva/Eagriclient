import React, { useState } from "react";
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
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { useUserAccessValidation } from "../../hooks/authentication";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";

import { useNavigate } from "react-router";
import DialogBox from "../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useSnackBars } from "../../context/SnackBarContext";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import CommonAuditList from "./CommonAuditList";
import { deleteAuditForm } from "../../redux/actions/auditForm/action";
import { components } from "react-select";
import ListHeader from "../../components/ListHeader/ListHeader";

const CommonAudit = ({ auditFormType = "" }) => {
  useUserAccessValidation();
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectAuditForm, setSelectAuditForm] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [action, setAction] = useState(DEF_ACTIONS.ADD);

  let uRIPath = "";
  let formHeader = "";
  let component = ""

  const populateAttributes = () => {
    if (auditFormType === "SELF_ASSESSMENT") {
      uRIPath = "self-assessment-form";
      formHeader = "Self Assessment Form";
      component = DEF_COMPONENTS.QUESTIONS_FORM_TEMPLATE
    } else if (auditFormType === "INTERNAL_AUDIT") {
      uRIPath = "internal-audit-form";
      formHeader = "Internal Audit Form";
      component = DEF_COMPONENTS.QUESTIONS_FORM_TEMPLATE
    } else if (auditFormType === "EXTERNAL_AUDIT") {
      uRIPath = "external-audit-form";
      formHeader = "External Audit Form";
      component = DEF_COMPONENTS.QUESTIONS_FORM_TEMPLATE
    } else if (auditFormType === "BASIC_ASSESSMENT") {
      uRIPath = "basic-assessment-form";
      formHeader = "Basic Assessment Form";
      component = DEF_COMPONENTS.QUESTIONS_FORM_TEMPLATE
    }
  };

  populateAttributes();

  const toggleAuditFormsSelect = (component) => {
    setSelectAuditForm((current = []) => {
      let newList = [...current];
      let index = newList.findIndex((c) => c?.id === component?.id);
      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(component);
      }
      return newList;
    });
    if (component?.questionDTOS.length > 0) {
      setSelectedQuestions(component.questionDTOS);
    }
  };

  const selectAllAuditForms = (all = []) => {
    setSelectAuditForm(all);
  };

  const resetSelectedAuditForms = () => {
    setSelectAuditForm([]);
  };

  const onCreate = () => {
    setAction(DEF_ACTIONS.ADD);
    navigate("/gap/" + uRIPath, {
      state: { action: DEF_ACTIONS.ADD },
    });
  };

  const onEdit = () => {
    setAction(DEF_ACTIONS.EDIT);
    navigate("/gap/" + uRIPath, {
      state: {
        action: DEF_ACTIONS.EDIT,
        target: selectAuditForm[0] || {},
        questionList: selectedQuestions || {},
      },
    });
  };

  const onView = () => {
    setAction(DEF_ACTIONS.VIEW);
    navigate("/gap/" + uRIPath, {
      state: {
        action: DEF_ACTIONS.VIEW,
        target: selectAuditForm[0] || {},
        questionList: selectedQuestions || {},
      },
    });
  };

  const onDelete = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectAuditForm.map((p, key) => {
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p.formName} - {p.formDescription}
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
      message: `Successfully Deleted`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Something went wrong.",
    });
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      for (const auditForm of selectAuditForm) {
        await deleteAuditForm(auditForm?.id, onSuccess, onError);
      }
      setLoading(false);
      close();
      resetSelectedAuditForms();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ListHeader title={formHeader} />
      <ActionWrapper isLeft>
        <ButtonGroup
          variant="outlined"
          disableElevation
          size="small"
          aria-label="action button group"
          color="success"
        >


          <PermissionWrapper
            permission={`${DEF_ACTIONS.ADD}_` + component}
          >

            <Button onClick={onCreate}>
              <Add />
              {DEF_ACTIONS.ADD}
            </Button>
          </PermissionWrapper>
          {selectAuditForm.length === 1 && (

            <PermissionWrapper
              permission={`${DEF_ACTIONS.EDIT}_` + component}
            >

              <Button onClick={onEdit}>
                <Edit />
                {DEF_ACTIONS.EDIT}
              </Button>
             </PermissionWrapper>
          )}
          {selectAuditForm.length === 1 && (

            <PermissionWrapper
              permission={`${DEF_ACTIONS.VIEW}_` + component}
            >

              <Button onClick={onView}>
                <Vrpano />
                {DEF_ACTIONS.VIEW}
              </Button>
             </PermissionWrapper>
          )}
          {selectAuditForm.length > 0 && (

            <PermissionWrapper
              permission={`${DEF_ACTIONS.DELETE}_` + component}
            >

              <Button onClick={onDelete}>
                <Delete />
                {DEF_ACTIONS.DELETE}
              </Button>
             </PermissionWrapper>
          )}
        </ButtonGroup>
      </ActionWrapper>

      <PermissionWrapper
        permission={`${DEF_ACTIONS.VIEW_LIST}_` + component}
      >

        {loading === false && (
          <CommonAuditList
            pathParm={auditFormType}
            selectedRows={selectAuditForm}
            onRowSelect={toggleAuditFormsSelect}
            selectAll={selectAllAuditForms}
            unSelectAll={resetSelectedAuditForms}
          />
        )}
      </PermissionWrapper>
      <DialogBox
        open={open}
        title={`Delete ${formHeader}`}
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={onConfirm}
              sx={{ ml: "8px" }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={close}
              sx={{ ml: "8px" }}
            >
              Close
            </Button>
          </ActionWrapper>
        }
      >
        <>
          <DeleteMsg />
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>
    </div>
  );
};

export default CommonAudit;
