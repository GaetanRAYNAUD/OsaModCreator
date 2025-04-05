import { FileInput } from '@components/layout/form.type'
import { Image } from '@mui/icons-material'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { imageFromFile } from '@utils/handle.utils.ts'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  input: FileInput;
}

export function ImageInput({ input }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageSrc((await imageFromFile(file)).image)
      setFileName(file.name)
      input.onChange(file)
    }
  }

  return (
    <Stack direction="row" spacing={ 2 } alignItems="center">
      <Stack direction="column" spacing={ 2 }>
        <Button
          variant="contained"
          startIcon={ <Image /> }
          onClick={ () => inputRef.current?.click() }
        >
          { t(input.label) }
        </Button>
        <input
          ref={ inputRef }
          type="file"
          accept={ input.accept }
          hidden
          onChange={ handleChange }
        />
        { fileName && (
          <Typography variant="body2" noWrap maxWidth={ input.maxWidth }>
            { fileName }
          </Typography>
        ) }
      </Stack>

      { imageSrc && (
        <Paper variant="outlined" sx={ { p: 2, mt: 2 } }>
          <img
            src={ imageSrc }
            alt={ t(input.label) }
            style={ { maxWidth: input.maxWidth } }
          />
        </Paper>
      ) }
    </Stack>
  )
}
