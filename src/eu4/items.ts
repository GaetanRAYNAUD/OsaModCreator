import { DescriptorFile, Eu4File, Eu4Folder, UnitFile, UnitsFolder } from '@eu4/folders.ts';
import { getRoutes } from '@routes.ts';

export type ItemCategory = {
  name: string;
  icon?: string;
  items: Item<any>[];
}

export interface Item<T> {
  name: string;
  route: string;
  subRoute?: string;
  folder?: Eu4Folder<T>;
  fileProvider?: (s: string) => Eu4File<T>;
  file?: Eu4File<T>;
}

const routes = getRoutes();

export const itemCategories: ItemCategory[] = [
  {
    name: 'main',
    items: [{
      name: 'descriptor',
      file: DescriptorFile,
      route: routes.DESCRIPTOR,
    }],
  },
  {
    name: 'common',
    items: [{
      name: 'advisors',
      route: routes.COMMON.ADVISORS,
    }, {
      name: 'countries',
      route: routes.COMMON.ADVISORS,
    }, {
      name: 'events',
      route: routes.COMMON.EVENTS,
    }, {
      name: 'decisions',
      route: routes.COMMON.DECISIONS,
    }, {
      name: 'missions',
      route: routes.COMMON.MISSIONS,
    }, {
      name: 'technologies',
      route: routes.COMMON.TECHNOLOGIES,
    }, {
      name: 'units',
      route: routes.COMMON.UNITS,
      folder: UnitsFolder,
      fileProvider: UnitFile,
    }, {
      name: 'institutions',
      route: routes.COMMON.INSTITUTIONS,
    }],
  },
  {
    name: 'economy',
    items: [{
      name: 'buildings',
      route: routes.ECONOMY.BUILDINGS,
    }, {
      name: 'trade_goods',
      route: routes.ECONOMY.TRADE_GOODS,
    }, {
      name: 'prices',
      route: routes.ECONOMY.PRICES,
    }, {
      name: 'great_projects',
      route: routes.ECONOMY.GREAT_PROJECTS,
    }, {
      name: 'trade_nodes',
      route: routes.ECONOMY.TRADE_NODES,
    }, {
      name: 'trade_companies',
      route: routes.ECONOMY.TRADE_COMPANIES,
    }, {
      name: 'colonial_regions',
      route: routes.ECONOMY.COLONIAL_REGIONS,
    }],
  },
  {
    name: 'government',
    items: [{
      name: 'governments',
      route: routes.GOVERNMENT.GOVERNMENTS,
    }, {
      name: 'government_reforms',
      route: routes.GOVERNMENT.GOVERNMENT_REFORMS,
    }, {
      name: 'cultures',
      route: routes.GOVERNMENT.CULTURES,
    }, {
      name: 'ideas',
      route: routes.GOVERNMENT.IDEAS,
    }, {
      name: 'policies',
      route: routes.GOVERNMENT.POLICIES,
    }, {
      name: 'custom_ideas',
      route: routes.GOVERNMENT.CUSTOM_IDEAS,
    }, {
      name: 'disasters',
      route: routes.GOVERNMENT.DISASTERS,
    }, {
      name: 'estates',
      route: routes.GOVERNMENT.ESTATES,
    }, {
      name: 'factions',
      route: routes.GOVERNMENT.FACTIONS,
    }, {
      name: 'parliament_issues',
      route: routes.GOVERNMENT.PARLIAMENT_ISSUES,
    }, {
      name: 'parliament_bribes',
      route: routes.GOVERNMENT.PARLIAMENT_BRIBES,
    }],
  },
  {
    name: 'diplomacy',
    items: [{
      name: 'cb',
      route: routes.DIPLOMACY.CBS,
    }, {
      name: 'war_goals',
      route: routes.DIPLOMACY.WAR_GOALS,
    }, {
      name: 'diplomatic_actions',
      route: routes.DIPLOMACY.DIPLOMATIC_ACTIONS,
    }],
  },
  {
    name: 'religion',
    items: [{
      name: 'religions',
      route: routes.RELIGION.RELIGIONS,
    }, {
      name: 'church_aspects',
      route: routes.RELIGION.CHURCH_ASPECTS,
    }, {
      name: 'fervor',
      route: routes.RELIGION.FERVORS,
    }, {
      name: 'fetishist_cults',
      route: routes.RELIGION.FETISHIST_CULTS,
    }, {
      name: 'personal_deities',
      route: routes.RELIGION.PERSONAL_DEITIES,
    }, {
      name: 'religious_reforms',
      route: routes.RELIGION.RELIGIOUS_REFORMS,
    }],
  },
  {
    name: 'history',
    items: [{
      name: 'bookmarks',
      route: routes.HISTORY.BOOKMARKS,
    }, {
      name: 'countries',
      route: routes.HISTORY.COUNTRIES,
    }, {
      name: 'provinces',
      route: routes.HISTORY.PROVINCES,
    }, {
      name: 'advisors',
      route: routes.HISTORY.ADVISORS,
    }, {
      name: 'diplomacy',
      route: routes.HISTORY.DIPLOMACY,
    }, {
      name: 'wars',
      route: routes.HISTORY.WARS,
    }],
  },
];