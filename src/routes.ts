import i18n from './i18n'

export const getRoutes = () => ({
  HOME: '/',
  MOD: `/${ i18n.t('routes.mod') }`,
  CREATE_MOD: `/${ i18n.t('routes.create_mod') }`,
  DESCRIPTOR: `/${ i18n.t('routes.descriptor') }`,
  COMMON: {
    ADVISORS: `/${ i18n.t('routes.common.advisors') }`,
    ADVISOR: `/${ i18n.t('routes.common.advisors') }/:id`,
    COUNTRIES: `/${ i18n.t('routes.common.countries') }`,
    COUNTRY: `/${ i18n.t('routes.common.countries') }/:id`,
    EVENTS: `/${ i18n.t('routes.common.events') }`,
    EVENT: `/${ i18n.t('routes.common.events') }/:id`,
    DECISIONS: `/${ i18n.t('routes.common.decisions') }`,
    DECISION: `/${ i18n.t('routes.common.decisions') }/:id`,
    MISSIONS: `/${ i18n.t('routes.common.missions') }`,
    MISSION: `/${ i18n.t('routes.common.missions') }/:id`,
    TECHNOLOGIES: `/${ i18n.t('routes.common.technologies') }`,
    TECHNOLOGY: `/${ i18n.t('routes.common.technologies') }/:id`,
    TECHNOLOGY_GROUPS: `/${ i18n.t('routes.common.technology_groups') }`,
    TECHNOLOGY_GROUP: `/${ i18n.t('routes.common.technology_groups') }/:id`,
    UNITS: `/${ i18n.t('routes.common.units') }`,
    UNIT: `/${ i18n.t('routes.common.units') }/:id`,
    INSTITUTIONS: `/${ i18n.t('routes.common.institutions') }`,
    INSTITUTION: `/${ i18n.t('routes.common.institutions') }/:id`,
  },
  ECONOMY: {
    BUILDINGS: `/${ i18n.t('routes.economy.buildings') }`,
    BUILDING: `/${ i18n.t('routes.economy.buildings') }/:id`,
    TRADE_GOODS: `/${ i18n.t('routes.economy.trade_goods') }`,
    TRADE_GOOD: `/${ i18n.t('routes.economy.trade_goods') }/:id`,
    PRICES: `/${ i18n.t('routes.economy.prices') }`,
    PRICE: `/${ i18n.t('routes.economy.prices') }/:id`,
    GREAT_PROJECTS: `/${ i18n.t('routes.economy.great_projects') }`,
    GREAT_PROJECT: `/${ i18n.t('routes.economy.great_projects') }/:id`,
    TRADE_NODES: `/${ i18n.t('routes.economy.trade_nodes') }`,
    TRADE_NODE: `/${ i18n.t('routes.economy.trade_nodes') }/:id`,
    TRADE_COMPANIES: `/${ i18n.t('routes.economy.trade_companies') }`,
    TRADE_COMPANY: `/${ i18n.t('routes.economy.trade_companies') }/:id`,
    COLONIAL_REGIONS: `/${ i18n.t('routes.economy.colonial_regions') }`,
    COLONIAL_REGION: `/${ i18n.t('routes.economy.colonial_regions') }/:id`,
  },
  GOVERNMENT: {
    GOVERNMENTS: `/${ i18n.t('routes.government.governments') }`,
    GOVERNMENT: `/${ i18n.t('routes.government.governments') }/:id`,
    GOVERNMENT_REFORMS: `/${ i18n.t('routes.government.government_reforms') }`,
    GOVERNMENT_REFORM: `/${ i18n.t('routes.government.government_reforms') }/:id`,
    CULTURES: `/${ i18n.t('routes.government.cultures') }`,
    CULTURE: `/${ i18n.t('routes.government.cultures') }/:id`,
    IDEAS: `/${ i18n.t('routes.government.ideas') }`,
    IDEA: `/${ i18n.t('routes.government.ideas') }/:id`,
    POLICIES: `/${ i18n.t('routes.government.policies') }`,
    POLICY: `/${ i18n.t('routes.government.policies') }/:id`,
    CUSTOM_IDEAS: `/${ i18n.t('routes.government.custom_ideas') }`,
    CUSTOM_IDEA: `/${ i18n.t('routes.government.custom_ideas') }/:id`,
    DISASTERS: `/${ i18n.t('routes.government.disasters') }`,
    DISASTER: `/${ i18n.t('routes.government.disasters') }/:id`,
    ESTATES: `/${ i18n.t('routes.government.estates') }`,
    ESTATE: `/${ i18n.t('routes.government.estates') }/:id`,
    FACTIONS: `/${ i18n.t('routes.government.factions') }`,
    FACTION: `/${ i18n.t('routes.government.factions') }/:id`,
    PARLIAMENT_ISSUES: `/${ i18n.t('routes.government.parliament_issues') }`,
    PARLIAMENT_ISSUE: `/${ i18n.t('routes.government.parliament_issues') }/:id`,
    PARLIAMENT_BRIBES: `/${ i18n.t('routes.government.parliament_bribes') }`,
    PARLIAMENT_BRIBE: `/${ i18n.t('routes.government.parliament_bribes') }/:id`,
  },
  DIPLOMACY: {
    CBS: `/${ i18n.t('routes.diplomacy.cb') }`,
    CB: `/${ i18n.t('routes.diplomacy.cb') }/:id`,
    WAR_GOALS: `/${ i18n.t('routes.diplomacy.war_goals') }`,
    WAR_GOAL: `/${ i18n.t('routes.diplomacy.war_goals') }/:id`,
    DIPLOMATIC_ACTIONS: `/${ i18n.t('routes.diplomacy.diplomatic_actions') }`,
    DIPLOMATIC_ACTION: `/${ i18n.t('routes.diplomacy.diplomatic_actions') }/:id`,
  },
  RELIGION: {
    RELIGIONS: `/${ i18n.t('routes.religion.religions') }`,
    RELIGION: `/${ i18n.t('routes.religion.religions') }/:id`,
    CHURCH_ASPECTS: `/${ i18n.t('routes.religion.church_aspects') }`,
    CHURCH_ASPECT: `/${ i18n.t('routes.religion.church_aspects') }/:id`,
    FERVORS: `/${ i18n.t('routes.religion.fervor') }`,
    FERVOR: `/${ i18n.t('routes.religion.fervor') }/:id`,
    FETISHIST_CULTS: `/${ i18n.t('routes.religion.fetishist_cults') }`,
    FETISHIST_CULT: `/${ i18n.t('routes.religion.fetishist_cults') }/:id`,
    PERSONAL_DEITIES: `/${ i18n.t('routes.religion.personal_deities') }`,
    PERSONAL_DEITY: `/${ i18n.t('routes.religion.personal_deities') }/:id`,
    RELIGIOUS_REFORMS: `/${ i18n.t('routes.religion.religious_reforms') }`,
    RELIGIOUS_REFORM: `/${ i18n.t('routes.religion.religious_reforms') }/:id`,
  },
  HISTORY: {
    BOOKMARKS: `/${ i18n.t('routes.history.bookmarks') }`,
    BOOKMARK: `/${ i18n.t('routes.history.bookmarks') }/:id`,
    COUNTRIES: `/${ i18n.t('routes.history.countries') }`,
    COUNTRY: `/${ i18n.t('routes.history.countries') }/:id`,
    PROVINCES: `/${ i18n.t('routes.history.provinces') }`,
    PROVINCE: `/${ i18n.t('routes.history.provinces') }/:id`,
    ADVISORS: `/${ i18n.t('routes.history.advisors') }`,
    ADVISOR: `/${ i18n.t('routes.history.advisors') }/:id`,
    DIPLOMACY: `/${ i18n.t('routes.history.diplomacy') }`,
    DIPLOMACYY: `/${ i18n.t('routes.history.diplomacy') }/:id`,
    WARS: `/${ i18n.t('routes.history.wars') }`,
    WAR: `/${ i18n.t('routes.history.wars') }/:id`,
  },
})
