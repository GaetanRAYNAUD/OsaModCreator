import { StateContext } from '@components/layout/Default.tsx'
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx'
import { SteamTag } from '@eu4/types.ts'
import {
  Box, capitalize, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material'
import { getRoutes } from '@routes.ts'
import { toList } from '@utils/objects.utils.ts'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function DescriptorPage() {
  const navigate = useNavigate()
  const routes = getRoutes()
  const { globalState } = useContext(StateContext)!

  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [supportedVersion, setSupportedVersion] = useState<string>('')
  const [tags, setTags] = useState<SteamTag[]>([])
  const [replacepath, setReplacePath] = useState<string[]>([])
  const [dependencies, setDependencies] = useState<string[]>([])
  const [picture, setPicture] = useState<string>('')

  useEffect(() => {
    if (!globalState || !globalState.handle) {
      navigate(routes.HOME)
    } else {
      (async () => {
        if (globalState.item && globalState.item.file && globalState.handle) {
          const descriptor = await globalState.item.file.getFile(globalState.handle)

          setName(descriptor.name ?? '')
          setVersion(descriptor.version ?? '')
          setSupportedVersion(descriptor.supported_version ?? '')
          setTags((descriptor.tags ?? []).map((t: SteamTag) => capitalize(t)).sort())
          setReplacePath(toList(descriptor.replace_path) ?? [])
          setDependencies(toList(descriptor.dependencies) ?? [])
          setPicture(descriptor.picture ?? '')
        }
      })()
    }
  }, [globalState])

  //todo translation, generify components

  const handleSubmit = () => {
    setLoading(true)
    console.log('handleSubmit')
    console.log(`tags: ${ tags }`)
    // setLoading(false)
  }

  const handleTags = (event: SelectChangeEvent<SteamTag[]>) => {
    if (Array.isArray(event.target.value)) {
      setTags(event.target.value.sort())
    }
  }

  return (
    <ModFormLayout handleSubmit={ handleSubmit } loading={ loading }>
      <TextField
        fullWidth
        label="Nom"
        required
        value={ name }
        onChange={ (event) => setName(event.target.value) }
      />
      <TextField
        fullWidth
        label="Version"
        value={ version }
        onChange={ (event) => setVersion(event.target.value) }
      />
      <TextField
        fullWidth
        label="Supported version"
        required
        value={ supportedVersion }
        onChange={ (event) => setSupportedVersion(event.target.value) }
      />
      <FormControl fullWidth>
        <InputLabel id="label-tags">Tags</InputLabel>
        <Select
          labelId="label-tags"
          id="demo-multiple-chip"
          multiple
          value={ tags }
          onChange={ handleTags }
          input={ <OutlinedInput label="Tags" /> }
          renderValue={ (selected) => (
            <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
              { selected.map((value) => (
                <Chip key={ value } label={ value } />
              )) }
            </Box>
          ) }
        >
          { Object.values(SteamTag).map((name) => (
            <MenuItem
              key={ name }
              value={ name }
            >
              <Checkbox checked={ tags.includes(name) } size="small" />
              <ListItemText primary={ name } />
            </MenuItem>
          )) }
        </Select>
      </FormControl>
    </ModFormLayout>
  )
}