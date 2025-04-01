import { ModLayout } from '@components/layout/ModLayout.tsx'
import { Button, CardActions } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  handleSubmit?: () => void,
  loading?: boolean,
}

export function ModFormLayout({ children, handleSubmit, loading }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation()

  return (
    <ModLayout>
      { children }
      <CardActions sx={ { justifyContent: 'center', width: '100%' } }>
        <Button variant="contained" color="primary" onClick={ handleSubmit } loading={ loading }>
          { t('save') }
        </Button>
      </CardActions>
    </ModLayout>
  )
}
