import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { TranslateActions } from "../../utils/constants/CrudActionTranslation";
import { DEF_ACTIONS } from "../../utils/constants/permission";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

const CrudActionButton = ({ title, action, handle }) => {
  const { t } = useTranslation();

  const actionComponents = {
    ADD: <Add />,
    EDIT: <Edit />,
    VIEW: <Vrpano />,
    DELETE: <Delete />,
  };

  const getIconAndAction = () => {
    const actionIcon = actionComponents[action];
    const actionText = TranslateActions(t, action);
    return (
      <>
        {actionIcon}
        {actionText}
      </>
    );
  };

  return (
    <>
      {action == DEF_ACTIONS.ADD && (
        <>
          <Button onClick={handle} title={t("buttonTooltip.add")}>{getIconAndAction()}</Button>
        </>
      )}
      {action == DEF_ACTIONS.EDIT && (
        <>
          <Button onClick={handle} title={t("buttonTooltip.edit")} >{getIconAndAction()}</Button>
        </>
      )}
      {action == DEF_ACTIONS.VIEW && (
        <>
          <Button onClick={handle} title={t("buttonTooltip.view")} >{getIconAndAction()}</Button>
        </>
      )}
      {action == DEF_ACTIONS.DELETE && (
        <>
          <Button onClick={handle} title={t("buttonTooltip.delete")}>{getIconAndAction()}</Button>
        </>
      )}
    </>
  );
};

export default CrudActionButton;
