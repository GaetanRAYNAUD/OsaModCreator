import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { getRoutes } from '@routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const ROUTES = getRoutes()

  return (
    <Box
      sx={ { textAlign: 'center', mt: 5 } }
    >
      <Typography
        variant="h3"
        gutterBottom
      >
        { t('app.title') }
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
      >
        { t('app.subtitle') }
      </Typography>

      { window !== undefined && 'showDirectoryPicker' in window ? (
        <Box
          display="flex"
          justifyContent="center"
          gap={ 2 }
        >
          <Card
            sx={ { width: 300, cursor: 'pointer' } }
            onClick={ () => navigate(ROUTES.CREATE_MOD) }
          >
            <CardContent>
              <Typography variant="h5">{ t('create.title') }</Typography>
              <Typography variant="body2">{ t('create.desc') }</Typography>
            </CardContent>
          </Card>
          <Card
            sx={ { width: 300, cursor: 'pointer' } }
            onClick={ () => navigate(ROUTES.MOD) }
          >
            <CardContent>
              <Typography variant="h5">{ t('select.title') }</Typography>
              <Typography variant="body2">{ t('select.desc') }</Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          gap={ 2 }
        >
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                { t('unsupported.title') }
              </Typography>
              <Typography variant="subtitle1">
                { t('unsupported.browser1') }
              </Typography>
              <Typography variant="subtitle1">
                { t('unsupported.browser2') }
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={ () => window.open('https://www.google.com/chrome/', '_blank') }
                variant="contained"
                endIcon={ <Avatar src="/images/Chrome.svg" sx={ { width: 24, height: 24 } } /> }
              >
                <Typography variant="body1" component="div">
                  { t('download') } Google Chrome
                </Typography>
              </Button>

              <Button
                onClick={ () => window.open('https://www.microsoft.com/edge', '_blank') }
                variant="contained"
                endIcon={ <Avatar src="/images/Edge.svg" sx={ { width: 24, height: 24 } } /> }
              >
                <Typography variant="body1" component="div">
                  { t('download') } Microsoft Edge
                </Typography>
              </Button>
            </CardActions>
          </Card>
        </Box>
      ) }
    </Box>)
}
