import { DescriptorFile, Eu4File, Eu4Folder } from '@eu4/folders.ts';

export type ItemCategory = {
  name: string;
  icon?: string;
  items: Item<any>[];
}

export type Item<T> = {
  name: string;
  folder?: Eu4Folder<T>
  file?: Eu4File<T>
}

export const itemCategories: ItemCategory[] = [
  {
    name: 'main',
    items: [{
      name: 'descriptor',
      file: DescriptorFile,
    }],
  },
  {
    name: 'common',
    items: [{
      name: 'advisors',
    }, {
      name: 'countries',
    }, {
      name: 'events',
    }, {
      name: 'decisions',
    }, {
      name: 'missions',
    }, {
      name: 'technologies',
    }, {
      name: 'units',
    }, {
      name: 'institutions',
    }],
  },
  {
    name: 'economy',
    items: [{
      name: 'buildings',
    }, {
      name: 'trade_goods',
    }, {
      name: 'prices',
    }, {
      name: 'great_projects',
    }, {
      name: 'trade_nodes',
    }, {
      name: 'trade_companies',
    }, {
      name: 'colonial_regions',
    }],
  },
  {
    name: 'government',
    items: [{
      name: 'cultures',
    }, {
      name: 'ideas',
    }, {
      name: 'policies',
    }, {
      name: 'disasters',
    }, {
      name: 'estates',
    }, {
      name: 'governments',
    }, {
      name: 'factions',
    }, {
      name: 'parliament_issues',
    }, {
      name: 'parliament_bribes',
    }, {
      name: 'custom_ideas',
    }],
  },
  {
    name: 'diplomacy',
    items: [{
      name: 'cb',
    }, {
      name: 'diplomatic_actions',
    }, {
      name: 'war_goals',
    }],
  },
  {
    name: 'religion',
    items: [{
      name: 'religions',
    }, {
      name: 'church_aspects',
    }, {
      name: 'fervor',
    }, {
      name: 'fetishist_cults',
    }, {
      name: 'personal_deities',
    }, {
      name: 'religious_reforms',
    }],
  },
  {
    name: 'history',
    items: [{
      name: 'bookmarks',
    }, {
      name: 'countries',
    }, {
      name: 'provinces',
    }, {
      name: 'advisors',
    }, {
      name: 'diplomacy',
    }, {
      name: 'wars',
    }],
  },
]