import { ImageInput } from '@components/form/ImageInput.tsx'
import { InputProps, InputType } from '@components/layout/form.type.ts'
import { ModLayout } from '@components/layout/ModLayout.tsx'
import { Help } from '@mui/icons-material'
import {
  Autocomplete, Box, Button, CardActions, Checkbox, Chip, FormControl, InputAdornment, InputLabel, ListItemText,
  MenuItem, OutlinedInput, Select, TextField, Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  inputs: InputProps<any>[],
  handle: FileSystemDirectoryHandle,
  handleSubmit?: () => void,
  loading?: boolean,
}

export function ModFormLayout({ handleSubmit, loading, inputs }: Props) {
  const { t } = useTranslation()
  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => {
    for (const input of inputs) {
      switch (input.type) {
        case InputType.TEXT: {
          if (input.required && !input.value) {
            setValid(false)
            console.log(`${ input.label } is required`)
            return
          }

          if (input.regex && !input.regex.test(input.value)) {
            setValid(false)
            console.log(`${ input.label } is invalid`)
            return
          }
          break
        }
        case InputType.SELECT: {
          if (input.required && (!input.value || input.value.length === 0)) {
            setValid(false)
            console.log(`${ input.label } is required`)
            return
          }
        }
          break
        case InputType.MULTI_TEXT: {
          if (input.required && (!input.value || input.value.length === 0)) {
            setValid(false)
            console.log(`${ input.label } is required`)
            return
          }

          if (input.regex && input.value.some(v => !input.regex?.test(v))) {
            setValid(false)
            console.log(`${ input.label } is invalid`)
            return
          }
        }
          break
        case InputType.FILE: {
          if (input.required && !input.value) {
            setValid(false)
            console.log(`${ input.label } is required`)
            return
          }
          break
        }
      }
    }

    setValid(true)
  }, [inputs])

  return (
    <ModLayout>
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
                  error={ input.regex && !input.regex.test(input.value) }
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
              )
            case InputType.SELECT:
              return (
                <FormControl fullWidth required={ input.required } key={ `${ input.label }-${ index }` }>
                  <InputLabel id={ `label-${ input.label }${ index }` }>{ t(input.label) }</InputLabel>
                  <Select
                    labelId={ `label-${ input.label }${ index }` }
                    id={ `select-${ input.label }${ index }` }
                    multiple
                    value={ input.value }
                    onChange={ input.onChange }
                    input={ <OutlinedInput label={ t(input.label) } /> }
                    error={ input.required && (!input.value || input.value.length === 0) }
                    renderValue={ (selected) => (
                      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                        { selected.map((value) => (
                          <Chip key={ value } label={ value } />
                        )) }
                      </Box>
                    ) }
                  >
                    { input.values.map((name) => (
                      <MenuItem
                        key={ name }
                        value={ name }
                      >
                        <Checkbox checked={ input.value.includes(name) } size="small" />
                        <ListItemText primary={ name } />
                      </MenuItem>
                    )) }
                  </Select>
                </FormControl>
              )
            case InputType.MULTI_TEXT:
              return (
                <Autocomplete
                  key={ `multi-text-${ input.label }` }
                  multiple
                  freeSolo
                  fullWidth
                  options={ [] }
                  value={ input.value }
                  onChange={ (_, newValue) => {
                    input.onChange(newValue?.map(v => v?.trim()))
                  } }
                  filterSelectedOptions={ false }
                  renderTags={ (value: string[], getTagProps) =>
                    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
                      { value.map((value, index) => {
                        const { key, ...tagProps } = getTagProps({ index })

                        return <Chip key={ key } label={ value } { ...tagProps } />
                      }) }
                    </Box>
                  }
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
                              <InputAdornment position="end">
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
              )
            case InputType.FILE:
              return (
                <ImageInput key={ `file-${ input.label }-${ index }` } input={ input } />
              )
            default:
              return <></>
          }
        })
      }
      <CardActions sx={ { justifyContent: 'center', width: '100%' } }>
        <Button variant="contained" color="primary" onClick={ handleSubmit } loading={ loading } disabled={ !valid }>
          { t('save') }
        </Button>
      </CardActions>
    </ModLayout>
  )
}
