import { COLORS } from '@assets/styles/theme.ts'
import { StateContext } from '@components/layout/Default.tsx'
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material'
import { ModHomePage } from '@pages/ModHome.tsx'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

enum Error {
  EMPTY = 'EMPTY',
  NO_DESCRIPTOR = 'NO_DESCRIPTOR'
}

export function SelectModPage() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<FileSystemDirectoryHandle>()
  const [error, setError] = useState<Error>()
  const { globalState, setGlobalState } = useContext(StateContext)!

  useEffect(() => {
    if (!selected && globalState && globalState.handle) {
      setSelected(globalState.handle)
    }
  }, [globalState, selected])

  useEffect(() => {
    if (selected) {
      (async () => {
        if (!(await selected.getFileHandle('descriptor.mod'))) {
          console.log('Invalid folder')
          setError(Error.NO_DESCRIPTOR)
          setSelected(undefined)
          return
        }

        setGlobalState({ handle: selected })
        setError(undefined)
      })()
    }
  }, [selected])

  useEffect(() => {
    if (error) {
      setSelected(undefined)
    }
  }, [error])

  return (
    <Box sx={ { mt: 5 } }>
      {
        (!error && globalState?.handle) ? (
          <ModHomePage />
        ) : (
          <>
            <Typography variant="h2" gutterBottom>
              { t('select.select') }
            </Typography>
            <Box mb={ 2 }>
              <Typography variant="subtitle1" component="p" sx={ { display: 'inline' } }>
                { t('select.step1') }
              </Typography>
              <Typography
                variant="subtitle1"
                sx={ {
                  display: 'inline',
                  backgroundColor: COLORS.SECONDARY_MAIN,
                  padding: 1,
                  borderRadius: 1,
                  color: COLORS.PRIMARY_MAIN,
                  border: '1px solid',
                } }
              >
                { t('select.step2') }
              </Typography>
            </Box>
            {
              error && (
                <Box sx={ { mb: 2 } }>
                  <Alert severity="error">
                    <AlertTitle sx={ { textAlign: 'left' } }>{ t('error') }</AlertTitle>
                    { t(`select.error.${ error }`) }
                  </Alert>
                </Box>
              )
            }
            <Box>
              <Button size="large" variant="contained" color="info"
                      onClick={ () => {
                        // @ts-ignore
                        window.showDirectoryPicker({ id: 'osamodcreator' })
                              .then(dir => setSelected(dir))
                              .catch(() => {})
                      } }>
                { t('select.select') }
              </Button>
            </Box>
          </>
        )
      }
    </Box>
  )
}