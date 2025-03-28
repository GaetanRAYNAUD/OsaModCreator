import i18n from "./i18n";

export const getRoutes = () => ({
  HOME: "/",
  MOD: `/${i18n.t("routes.mod")}`,
  CREATE_MOD: `/${i18n.t("routes.create_mod")}`
});
