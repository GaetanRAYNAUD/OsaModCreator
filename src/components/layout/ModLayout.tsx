import { COLORS } from '@assets/styles/theme.ts'
import { StateContext } from '@components/layout/Default.tsx'
import { Card, Container, Grid2, Typography } from '@mui/material'
import { getRoutes } from '@routes.ts'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function ModLayout({ children }: React.PropsWithChildren<{}>) {
  const { t } = useTranslation()
  const routes = getRoutes()
  const navigate = useNavigate()
  const { globalState } = useContext(StateContext)!

  useEffect(() => {
    if (!globalState || !globalState.item || !globalState.category) {
      navigate(routes.HOME)
    }
  }, [globalState, navigate])

  useEffect(() => {
    if (globalState && globalState.descriptor && globalState.category) {
      document.title = globalState.descriptor.name + ' - ' + t(
        `category.${ globalState.category.name }.title`) + ' - ' + t('app.title')
    }
  }, [globalState, t])

  return (
    (!globalState || !globalState.descriptor || !globalState.item || !globalState.category) ? <></> : (
      <Container maxWidth="md" sx={ { padding: 4 } }>
        <Typography variant="h3" gutterBottom>
          { globalState.descriptor.name } - { t('app.title') }
        </Typography>
        <Typography variant="h4" gutterBottom>
          { t(`category.${ globalState.category.name }.${ globalState.item.name }.title`) }
        </Typography>
        <Card sx={ { backgroundColor: COLORS.SECONDARY_MAIN, padding: 3 } }>
          <Grid2 container spacing={ 2 }>
            { children }
          </Grid2>
        </Card>
      </Container>
    )
  )
}
