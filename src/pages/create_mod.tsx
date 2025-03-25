import { Box, Button, Container, Typography } from '@mui/material'
import { getRoutes } from '@routes.ts'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function CreateModPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ROUTES = getRoutes()

  return (
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Typography variant="h4" gutterBottom>
        { t('mod.create') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step1') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step2') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step3') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step4') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step5') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('mod.create_step6') }
      </Typography>

      <Box mt={ 4 }>
        <Button variant="contained"  color="secondary" onClick={ () => navigate(ROUTES.HOME) }>
          { t('mod.return_home') }
        </Button>
      </Box>
    </Container>
  )
}