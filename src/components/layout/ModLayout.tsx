import { COLORS } from '@assets/styles/theme.ts';
import { StateContext } from '@components/layout/Default.tsx';
import { Card, Container, Grid2, Typography } from '@mui/material';
import { getRoutes } from '@routes.ts';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AbsoluteLoader from '@components/AbsoluteLoader.tsx';

type Props = {
  name?: string;
  dark?: boolean;
  loading?: boolean;
}

export function ModLayout({ children, name, dark = false, loading = false }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation();
  const routes = getRoutes();
  const navigate = useNavigate();
  const { globalState } = useContext(StateContext)!;

  useEffect(() => {
    if (!globalState || !globalState.item || !globalState.category) {
      navigate(routes.HOME);
    }
  }, [globalState, navigate]);

  useEffect(() => {
    if (globalState && globalState.descriptor && globalState.category) {
      if (globalState.item) {
        if (name) {
          document.title = globalState.descriptor.name + ' - ' + t(
            `category.${ globalState.category.name }.${ globalState.item.name }.title`) + ' - ' + name;
        } else {
          document.title = globalState.descriptor.name + ' - ' + t(
            `category.${ globalState.category.name }.${ globalState.item.name }.title`);
        }
      } else {
        document.title = globalState.descriptor.name + ' - ' + t(
          `category.${ globalState.category.name }.title`) + ' - ' + t('app.title');
      }
    }
  }, [globalState, t, name]);

  return (
    (!globalState || !globalState.descriptor || !globalState.item || !globalState.category) ? <></> : (
      <Container maxWidth="md" sx={ { padding: 4 } }>
        <Typography variant="h3" gutterBottom>
          { globalState.descriptor.name } - { t('app.title') }
        </Typography>
        <Typography variant="h4" gutterBottom>
          { t(
            `category.${ globalState.category.name }.${ globalState.item.name }.title`) + `${ name && name.length > 0 ? ' - ' + name : '' }` }
        </Typography>
        {
          loading ? (
            <AbsoluteLoader />
          ) : (
            <Card sx={ { backgroundColor: dark ? COLORS.SECONDARY_DARK : COLORS.SECONDARY_MAIN, padding: 3 } }>
              <Grid2 container spacing={ 2 }>
                { children }
              </Grid2>
            </Card>
          )
        }
      </Container>
    )
  );
}
