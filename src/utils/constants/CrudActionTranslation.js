export const TranslateActions = (t, action) => {
  const DEF_ACTIONS_TRANSLATE = {
    ADD: "add",
    VIEW: "view",
    VIEW_LIST: "viewList",
    EDIT: "edit",
    DELETE: "delete",
    APPROVE: "approve",
    ASSIGN: "assign",
    GENERATE: "generate",
    EXPORT: "export"
  };
  return t("crudButton")[DEF_ACTIONS_TRANSLATE[action]];
};
