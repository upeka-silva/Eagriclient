export const TranslateActions = (t, action) => {
  const DEF_ACTIONS_TRANSLATE = {
    ADD: "add",
    VIEW: "view",
    VIEW_LIST: "view_list",
    EDIT: "edit",
    DELETE: "delete",
    APPROVE: "approve",
    ASSIGN: "assign",
    GENERATE: "generate",
  };
  return t("crudbutton")[DEF_ACTIONS_TRANSLATE[action]];
};
