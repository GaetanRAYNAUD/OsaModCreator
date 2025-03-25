import { Box } from '@mui/material'
import { CreateModPage } from '@pages/create_mod.tsx'
import { HomePage } from '@pages/home.tsx'
import { getRoutes } from '@routes.ts'
import * as React from 'react'
import { Route, Routes } from 'react-router'

const DefaultLayout: React.FC = () => {
  const ROUTES = getRoutes()

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minHeight: '100vh' } }>
      <Box width="100%" pt={ 12 } sx={ { flexGrow: 1, overflowX: 'clip' } } display="flex" flexDirection="column">
        <Routes>
          <Route path={ ROUTES.HOME } element={ <HomePage /> } />
          <Route path={ ROUTES.CHOOSE_MOD } element={ <div>Page de sélection des mods</div> } />
          <Route path={ ROUTES.CREATE_MOD } element={ <CreateModPage /> } />
        </Routes>
      </Box>
    </Box>
  )
}

export default DefaultLayout
