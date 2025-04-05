import { SelectChangeEvent } from '@mui/material'
import { AutocompleteValue } from '@mui/material/useAutocomplete/useAutocomplete'
import { ChangeEvent } from 'react'

export enum InputType {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  MULTI_TEXT = 'MULTI_TEXT',
  FILE = 'FILE',
}

export type Input = {
  type: InputType,
  required: boolean,
  label: string,
  tooltip?: string,
}

export type TextInput<T> = Input & {
  type: InputType.TEXT,
  value: T,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  regex?: RegExp,
}

export type SelectInput<T> = Input & {
  type: InputType.SELECT,
  onChange: (event: SelectChangeEvent<T[]>) => void,
  value: T[],
  values: T[],
}

export type MultiTextInput<T> = Input & {
  type: InputType.MULTI_TEXT,
  onChange: (value: AutocompleteValue<T, true, false, true>) => void,
  value: T[],
  regex?: RegExp,
}

export type FileInput = Input & {
  type: InputType.FILE,
  onChange: (value: File) => void,
  value?: File,
  accept?: string,
  maxWidth?: string | number,
}

export type InputProps<T> = TextInput<T> | SelectInput<T> | MultiTextInput<T> | FileInput;