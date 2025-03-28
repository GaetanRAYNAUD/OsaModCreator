export enum Power {
  ADM = 'ADM', DIP = 'DIP', MIL = 'MIL'
}

export type Descriptor = {
  name: string;
  version: string;
  tags: string[];
  replace_path: string[] | string
  supported_version: string;
  path: string;
  dependencies: string[] | string;
  picture: string;
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