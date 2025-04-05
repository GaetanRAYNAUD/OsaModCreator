import { StateContext } from '@components/layout/Default.tsx'
import { InputProps } from '@components/layout/form.type'
import { InputType } from '@components/layout/form.type.ts'
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx'
import { SteamTag } from '@eu4/types.ts'
import { capitalize, SelectChangeEvent } from '@mui/material'
import { getRoutes } from '@routes.ts'
import { fileFromPath } from '@utils/handle.utils.ts'
import { toList } from '@utils/objects.utils.ts'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
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
  const [replacePath, setReplacePath] = useState<string[]>([])
  const [dependencies, setDependencies] = useState<string[]>([])
  const [picture, setPicture] = useState<string>('')
  const [pictureFile, setPictureFile] = useState<File | undefined>(undefined)

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

  useEffect(() => {
    (async () => {
      if (picture && !!picture && globalState && globalState.handle) {
        setPictureFile(await fileFromPath(globalState.handle, 'thumbnail.png'))
      }
    })()
  }, [picture, globalState])

  const handleSubmit = () => {
    setLoading(true)
    console.log('handleSubmit')
    //todo handle picture file
    // setLoading(false)
  }

  const inputs: InputProps<any>[] = [
    {
      type: InputType.TEXT,
      required: true,
      label: 'input.descriptor.name',
      value: name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    },
    {
      type: InputType.TEXT,
      required: false,
      label: 'input.descriptor.version',
      value: version,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVersion(event.target.value),
    },
    {
      type: InputType.TEXT,
      required: true,
      label: 'input.descriptor.supportedVersion',
      value: supportedVersion,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setSupportedVersion(event.target.value),
      regex: /v\d\.(\d{1,3}|\*)\.?(\d{1,3}|\*)?\.?(\d{1,3}|\*)?/,
      tooltip: 'input.descriptor.supportedVersion.tooltip',
    },
    {
      type: InputType.SELECT,
      required: false,
      label: 'input.descriptor.tags',
      value: tags,
      onChange: (event: SelectChangeEvent<SteamTag[]>) => {
        if (Array.isArray(event.target.value)) {
          setTags(event.target.value.sort())
        }
      },
      values: Object.values(SteamTag),
    },
    {
      type: InputType.MULTI_TEXT,
      required: false,
      label: 'input.descriptor.replacePath',
      value: replacePath,
      onChange: setReplacePath,
      tooltip: 'input.descriptor.replacePath.tooltip',
    },
    {
      type: InputType.MULTI_TEXT,
      required: false,
      label: 'input.descriptor.dependencies',
      value: dependencies,
      onChange: setDependencies,
      tooltip: 'input.descriptor.dependencies.tooltip',
    },
    {
      type: InputType.FILE,
      required: false,
      label: 'input.descriptor.picture',
      value: pictureFile,
      onChange: setPictureFile,
      accept: 'image/png',
      maxWidth: 200,
    },
  ]

  return (
    globalState && globalState.handle &&
    <ModFormLayout handle={ globalState.handle } handleSubmit={ handleSubmit } loading={ loading } inputs={ inputs } />
  )
}