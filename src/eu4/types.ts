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
  replace_path: string[];
  supported_version: string;
  path: string;
  dependencies: string[];
  picture?: string;
  remote_file_id?: string;
}

export type TechnologyGroups = {
  groups: Record<string, TechnologyGroup>;
  tables: { adm_tech: string; dip_tech: string; mil_tech: string; }
}

export type TechnologyGroup = {
  start_level: number;
  start_cost_modifier: number;
  is_primitive?: boolean;
  nation_designer_unit_type?: string;
  nation_designer_trigger?: Trigger;
  nation_designer_cost?: { trigger: Trigger, value: number };
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

export type Trigger = {}

export type Unit = {
  type: UnitType;
  unit_type?: string; //tech_group
  maneuver?: number;
  offensive_morale?: number;
  defensive_morale?: number;
  offensive_fire?: number;
  defensive_fire?: number;
  offensive_shock?: number;
  defensive_shock?: number;
  hull_size?: number;
  base_cannons?: number;
  sail_speed?: number;
  blockade?: number;
  sprite_level?: number;
  sailors?: number;
  trade_power?: number;
  trigger?: Trigger;
}

export enum UnitType {
  INFANTRY = 'infantry',
  CAVALRY = 'cavalry',
  ARTILLERY = 'artillery',
  HEAVY_SHIP = 'heavy_ship',
  LIGHT_SHIP = 'light_ship',
  GALLEY = 'galley',
  TRANSPORT = 'transport',
}

export const isLandUnit = (type: UnitType): boolean => {
  switch (type) {
    case UnitType.INFANTRY:
    case UnitType.CAVALRY:
    case UnitType.ARTILLERY:
      return true;
    case UnitType.HEAVY_SHIP:
    case UnitType.LIGHT_SHIP:
    case UnitType.GALLEY:
    case UnitType.TRANSPORT:
      return false;
  }
};