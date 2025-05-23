import { StateContext } from '@components/layout/Default.tsx'
import { Box, Button, Typography } from '@mui/material';
import { getRoutes } from '@routes.ts';
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export function CreateModPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ROUTES = getRoutes()
  const { globalState, setGlobalState } = useContext(StateContext)!

  useEffect(() => {
    if (globalState) {
      setGlobalState(null)
    }
  }, [globalState, setGlobalState])

  return (
    <Box sx={ { mt: 5 } }>
      <Typography variant="h4" gutterBottom>
        { t('create.title') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step1') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step2') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step3') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step4') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step5') }
      </Typography>
      <Typography variant="body1" component="p">
        { t('create.step6') }
      </Typography>

      <Box mt={ 4 }>
        <Button variant="contained"  color="secondary" onClick={ () => navigate(ROUTES.HOME) }>
          { t('create.return_home') }
        </Button>
      </Box>
    </Box>
  )
}