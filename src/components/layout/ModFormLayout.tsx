import { ImageInput } from '@components/form/ImageInput.tsx';
import ListboxComponent from '@components/form/ListboxComponent.tsx';
import { InputProps, InputType } from '@components/layout/form.type.ts';
import { ModLayout } from '@components/layout/ModLayout.tsx';
import { CheckBox, CheckBoxOutlineBlank, Help } from '@mui/icons-material';
import {
  Autocomplete, Box, Button, CardActions, Checkbox, Chip, FormControlLabel, InputAdornment, TextField, Tooltip,
} from '@mui/material';
import {
  AutocompleteOwnerState, AutocompleteRenderGetTagProps, AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete/Autocomplete';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  name?: string;
  inputs: InputProps<any>[],
  handleSubmit?: () => void,
  submitting?: boolean,
  loading?: boolean,
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;


export function ModFormLayout({ name, handleSubmit, submitting = false, inputs, loading = false }: Props) {
  const { t } = useTranslation();
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    for (const input of inputs) {
      switch (input.type) {
        case InputType.TEXT: {
          if (input.required && !input.value) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }

          if (input.regex && !input.regex.test(input.value)) {
            setValid(false);
            console.log(`${ input.label } is invalid`);
            return;
          }
          break;
        }
        case InputType.SELECT: {
          if (input.required && !input.value) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }
        }
          break;
        case InputType.MULTI_SELECT: {
          if (input.required && (!input.value || input.value.length === 0)) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }
        }
          break;
        case InputType.MULTI_TEXT: {
          if (input.required && (!input.value || input.value.length === 0)) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }

          if (input.regex && input.value.some(v => !input.regex?.test(v))) {
            setValid(false);
            console.log(`${ input.label } is invalid`);
            return;
          }
        }
          break;
        case InputType.FILE: {
          if (input.required && !input.value) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }
          break;
        }
        case InputType.BOOLEAN:
        case InputType.NUMBER:
          if (input.required && !input.value) {
            setValid(false);
            console.log(`${ input.label } is required`);
            return;
          }
          break;
      }
    }

    setValid(true);
  }, [inputs]);

  return (
    <ModLayout name={ name } loading={ loading }>
      {
        inputs.map((input: InputProps<any>, index: number) => {
          switch (input.type) {
            case InputType.TEXT:
              return (
                <TextField
                  key={ `${ input.label }${ index }` }
                  fullWidth
                  label={ t(input.label) }
                  required={ input.required }
                  value={ input.value }
                  onChange={ input.onChange }
                  error={ (input.required && !input.value) || (input.regex && !input.regex.test(input.value)) }
                  slotProps={ input.tooltip ? {
                    input: {
                      endAdornment: <InputAdornment position="end">
                        <Tooltip title={ t(input.tooltip) }>
                          <Help />
                        </Tooltip>
                      </InputAdornment>,
                    },
                  } : {} }
                />
              );
            case InputType.NUMBER:
              return (
                <TextField
                  key={ `${ input.label }${ index }` }
                  fullWidth
                  type="number"
                  label={ t(input.label) }
                  required={ input.required }
                  value={ input.value }
                  onChange={ input.onChange }
                  error={ input.required && !input.value }
                  inputProps={ {
                    step: input.step,
                    min: input.min,
                    max: input.max,
                  } }
                  slotProps={ input.tooltip ? {
                    inputLabel: {
                      shrink: true,
                    },
                    input: {
                      inputMode: 'numeric',
                      endAdornment: <InputAdornment position="end">
                        <Tooltip title={ t(input.tooltip) }>
                          <Help />
                        </Tooltip>
                      </InputAdornment>,
                    },
                  } : {} }
                />
              );
            case InputType.SELECT:
            case InputType.MULTI_SELECT:
            case InputType.MULTI_TEXT: {
              let values: any[] = [];
              let multiple = false;
              let freeSolo = false;
              let optionDisable = undefined;
              let renderOption: ((props: React.HTMLAttributes<HTMLLIElement> & { key: any },
                                  option: any,
                                  state: AutocompleteRenderOptionState,
                                  ownerState: AutocompleteOwnerState<any, boolean, boolean, boolean, React.ElementType>) => React.ReactNode) | undefined =
                (props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={ key } { ...optionProps }>
                      <Checkbox
                        icon={ icon }
                        checkedIcon={ checkedIcon }
                        style={ { marginRight: 8 } }
                        checked={ selected }
                      />
                      { input.translation ? input.translation(option) : option }
                    </li>
                  );
                };
              let renderTags: ((
                value: any[],
                getTagProps: AutocompleteRenderGetTagProps,
                ownerState: AutocompleteOwnerState<any, boolean, boolean, boolean, React.ElementType>,
              ) => React.ReactNode) | undefined = (value: string[], getTagProps) =>
                <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                  { value.map((value, index) => {
                    const { key, ...tagProps } = getTagProps({ index });

                    return <Chip key={ key }
                                 label={ input.translation ? input.translation(value) : value } { ...tagProps } />;
                  }) }
                </Box>;

              switch (input.type) {
                case InputType.SELECT:
                  values = input.values;
                  renderOption = undefined;
                  renderTags = undefined;
                  optionDisable = input.optionDisabled;
                  break;
                case InputType.MULTI_SELECT:
                  values = input.values;
                  multiple = true;
                  optionDisable = input.optionDisabled;
                  break;
                case InputType.MULTI_TEXT:
                  multiple = true;
                  freeSolo = true;
                  renderOption = undefined;
                  break;
              }

              return (
                <Autocomplete
                  key={ `${ input.type }-${ input.label }` }
                  fullWidth
                  disableClearable={ input.required }
                  multiple={ multiple }
                  freeSolo={ freeSolo }
                  options={ values }
                  value={ input.value }
                  onChange={ (_, newValue) => {
                    input.onChange(newValue);
                  } }
                  ListboxComponent={ ListboxComponent }
                  filterSelectedOptions={ false }
                  getOptionLabel={ input.translation }
                  getOptionKey={ input.keyExtractor }
                  renderOption={ renderOption }
                  renderTags={ renderTags }
                  getOptionDisabled={ optionDisable }
                  renderInput={ (params) => (
                    <TextField
                      { ...params }
                      variant="outlined"
                      label={ t(input.label) }
                      placeholder={ t(input.label) }
                      slotProps={ input.tooltip ? {
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              <InputAdornment position="end"
                                              sx={ { position: 'absolute', right: values.length > 0 ? 56 : 28 } }>
                                <Tooltip title={ t(input.tooltip) }>
                                  <Help />
                                </Tooltip>
                              </InputAdornment>
                              { params.InputProps.endAdornment }
                            </>
                          ),
                        },
                      } : {
                        input: {
                          ...params.InputProps,
                        },
                      } }
                    />
                  ) }
                />
              );
            }
            case InputType.FILE:
              return (
                <ImageInput key={ `file-${ input.label }-${ index }` } input={ input } />
              );
            case InputType.BOOLEAN:
              return (
                <FormControlLabel key={ `${ input.label }${ index }` }
                                  control={ <Checkbox checked={ input.value } onChange={ input.onChange } /> }
                                  required={ input.required }
                                  label={ <Box component="span" sx={ { display: 'flex', alignItems: 'center' } }>
                                    { t(input.label) }
                                    { input.tooltip && (
                                      <Tooltip title={ t(input.tooltip) }>
                                        <Help sx={ { marginLeft: 1, fill: 'rgba(0, 0, 0, 0.54)' } } />
                                      </Tooltip>
                                    )
                                    }
                                  </Box> } />
              );
            default:
              return <></>;
          }
        })
      }
      <CardActions sx={ { justifyContent: 'center', width: '100%' } }>
        <Button variant="contained" color="primary" onClick={ handleSubmit } loading={ submitting } disabled={ !valid }>
          { t('save') }
        </Button>
      </CardActions>
    </ModLayout>
  );
}
