import { AutocompleteValue } from '@mui/material/useAutocomplete/useAutocomplete';
import { ChangeEvent } from 'react';

export enum InputType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  MULTI_TEXT = 'MULTI_TEXT',
  FILE = 'FILE',
  BOOLEAN = 'BOOLEAN',
}

export type Input = {
  type: InputType,
  required: boolean,
  label: string,
  tooltip?: string,
}

export type TextInput = Input & {
  type: InputType.TEXT,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  regex?: RegExp,
}

export type NumberInput = Input & {
  type: InputType.NUMBER,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  step?: number,
  min?: number,
  max?: number,
  allowFloat?: boolean,
}

export type SelectInput<T> = Input & {
  type: InputType.SELECT,
  onChange: (event: AutocompleteValue<T, false, false, false>) => void,
  value: T,
  values: T[],
  translation?: (s: T) => string,
  keyExtractor: (s: T) => string,
  optionDisabled?: (s: T) => boolean;
}

export type MultiSelectInput<T> = Input & {
  type: InputType.MULTI_SELECT,
  onChange: (event: AutocompleteValue<T, true, false, false>) => void,
  value: T[],
  values: T[],
  translation?: (s: T) => string,
  keyExtractor: (s: T) => string,
  optionDisabled?: (s: T) => boolean;
}

export type MultiTextInput<T> = Input & {
  type: InputType.MULTI_TEXT,
  onChange: (value: AutocompleteValue<T, true, false, true>) => void,
  value: T[],
  translation?: (s: T) => string,
  keyExtractor: (s: T) => string,
  regex?: RegExp,
}

export type FileInput = Input & {
  type: InputType.FILE,
  onChange: (value: File) => void,
  value?: File,
  accept?: string,
  maxWidth?: string | number,
}

export type BooleanInput = Input & {
  type: InputType.BOOLEAN,
  value: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
}

export type InputProps<T> = TextInput | NumberInput | SelectInput<T> | MultiSelectInput<T> | MultiTextInput<T>
  | FileInput | BooleanInput;