export enum SteamTag {
  ALTERNATIVE_HISTORY = 'Alternative History',
  BALANCE = 'Balance',
  EVENTS = 'Events',
  EXPANSION = 'Expansion',
  FIXES = 'Fixes',
  GAMEPLAY = 'Gameplay',
  GRAPHICS = 'Graphics',
  GUIDE = 'Guide',
  HISTORICAL = 'Historical',
  LOADING_SCREEN = 'Loading Screen',
  MAP = 'Map',
  MILITARY = 'Military',
  MISSIONS_AND_DECISIONS = 'Missions And Decisions',
  NATIONAL_IDEAS = 'National Ideas',
  NEW_NATIONS = 'New Nations',
  RELIGION = 'Religion',
  SOUND = 'Sound',
  TECHNOLOGIES = 'Technologies',
  TRADE = 'Trade',
  TRANSLATION = 'Translation',
  UTILITIES = 'Utilities',
}

export enum Power {
  ADM = 'ADM', DIP = 'DIP', MIL = 'MIL'
}

export type Descriptor = {
  name: string;
  version: string;
  tags: SteamTag[];
  replace_path?: string[];
  supported_version: string;
  path: string;
  dependencies?: string[];
  picture?: string;
  remote_file_id?: string;
}

export type AdvisorTypes = Record<string, AdvisorType>;

export type AdvisorType = Modifier & {
  monarch_power: Power;
  allow_only_male: boolean;
  allow_only_female: boolean;
  chance: Chance;
  ai_will_do: Chance;
}

export type Chance = {
  factor: number
  modifier: Chance[]
}

export type Scope = object

export type Modifier = {
  prestige: number
  production_efficiency: number
}