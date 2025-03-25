import i18n from "./i18n";

export const getRoutes = () => ({
  HOME: "/",
  CHOOSE_MOD: `/${i18n.t("routes.choose_mod")}`,
  CREATE_MOD: `/${i18n.t("routes.create_mod")}`
});
