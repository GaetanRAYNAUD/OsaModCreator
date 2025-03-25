import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import { getRoutes } from '@routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const ROUTES = getRoutes();

  return (
    <Container maxWidth="md" sx={ { textAlign: 'center', mt: 5 } }>
      <Typography variant="h3" gutterBottom>
        { t('app.title') }
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        { t('app.subtitle') }
      </Typography>

      <Box display="flex" justifyContent="center" gap={ 2 } mt={ 4 }>
        <Card sx={ { width: 300, cursor: 'pointer' } } onClick={ () => navigate(ROUTES.CREATE_MOD) }>
          <CardContent>
            <Typography variant="h5">{ t('mod.create') }</Typography>
            <Typography variant="body2">{ t('mod.create_desc') }</Typography>
          </CardContent>
        </Card>
        <Card sx={ { width: 300, cursor: 'pointer' } } onClick={ () => navigate(ROUTES.CHOOSE_MOD) }>
          <CardContent>
            <Typography variant="h5">{ t('choose_mod') }</Typography>
            <Typography variant="body2">{ t('choose_mod_desc') }</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}