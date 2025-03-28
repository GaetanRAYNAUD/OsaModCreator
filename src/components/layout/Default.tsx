import { Box } from '@mui/material'
import { CreateModPage } from '@pages/CreateMod.tsx'
import { HomePage } from '@pages/Home.tsx'
import { SelectModPage } from '@pages/SelectMod.tsx'
import { getRoutes } from '@routes.ts'
import * as React from 'react'
import { Route, Routes } from 'react-router'

const DefaultLayout: React.FC = () => {
  const ROUTES = getRoutes()

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minHeight: '100vh' } }>
      <Box width="100%" sx={ { flexGrow: 1, overflowX: 'clip' } } display="flex" flexDirection="column">
        <Routes>
          <Route path={ ROUTES.HOME } element={ <HomePage /> } />
          <Route path={ ROUTES.MOD } element={ <SelectModPage /> } />
          <Route path={ ROUTES.CREATE_MOD } element={ <CreateModPage /> } />
        </Routes>
      </Box>
    </Box>
  )
}

export default DefaultLayout
