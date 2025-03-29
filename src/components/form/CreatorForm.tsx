import { Box } from '@mui/material';
import React from 'react';

type Props = {
  test: string;
}

export function CreatorForm({ test, children }: React.PropsWithChildren<Props>) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minHeight: '100vh' }}>
      {
        test
      }
      {children}
    </Box>
  );
}
