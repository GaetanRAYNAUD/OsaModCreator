import { ModListLayout } from '@components/layout/ModListLayout.tsx';
import { Item, ItemCategory } from '@eu4/items.ts';
import { Descriptor } from '@eu4/types.ts';
import { Box } from '@mui/material';
import { CreateModPage } from '@pages/CreateMod.tsx';
import { DescriptorPage } from '@pages/eu4/Descriptor.tsx';
import { TechnologyGroupPage } from '@pages/eu4/TechnologyGroup.tsx';
import { UnitPage } from '@pages/eu4/Unit.tsx';
import { HomePage } from '@pages/Home.tsx';
import { SelectModPage } from '@pages/SelectMod.tsx';
import { getRoutes } from '@routes.ts';
import * as React from 'react';
import { createContext, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';

type GlobalState = {
  handle?: FileSystemDirectoryHandle,
  descriptor?: Descriptor,
  category?: ItemCategory,
  item?: Item<any>,
}

export const StateContext = createContext<{
  globalState: GlobalState | null;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState | null>>
} | null>(null);

const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const state = location.state as GlobalState;
  const ROUTES = getRoutes();
  const [globalState, setGlobalState] = useState<GlobalState | null>(null);

  if (!globalState && state && state.handle) {
    setGlobalState(state);
  }

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minHeight: '100vh' } }>
      <Box width="100%" sx={ { flexGrow: 1, overflowX: 'clip' } } display="flex" flexDirection="column">
        <StateContext.Provider value={ { globalState, setGlobalState } }>
          <Routes>
            <Route path={ ROUTES.HOME } element={ <HomePage /> } />
            <Route path={ ROUTES.MOD } element={ <SelectModPage /> } />
            <Route path={ ROUTES.CREATE_MOD } element={ <CreateModPage /> } />
            <Route path={ ROUTES.DESCRIPTOR } element={ <DescriptorPage /> } />
            <Route path={ ROUTES.COMMON.UNITS } element={ <ModListLayout /> } />
            <Route path={ ROUTES.COMMON.UNIT } element={ <UnitPage /> } />
            <Route path={ ROUTES.COMMON.TECHNOLOGY_GROUPS } element={ <ModListLayout /> } />
            <Route path={ ROUTES.COMMON.TECHNOLOGY_GROUP } element={ <TechnologyGroupPage /> } />
            <Route path="*" element={ <Navigate to={ ROUTES.MOD } replace /> } />
          </Routes>
        </StateContext.Provider>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
