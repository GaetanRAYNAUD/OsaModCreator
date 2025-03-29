import { DescriptorFile } from '@eu4/folders.ts';
import { Descriptor } from '@eu4/types.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { CreatorForm } from '@components/form/CreatorForm.tsx';
import { getRoutes } from '@routes.ts';

type State = {
  handle: FileSystemDirectoryHandle,
}

export function DescriptorPage() {
  const [descriptor, setDescriptor] = useState<Descriptor>();
  const location = useLocation();
  const state = location.state as State;
  const navigate = useNavigate();
  const routes = getRoutes();
  const { t } = useTranslation();

  useEffect(() => {
    if (!state || !state.handle) {
      navigate(routes.HOME);
    }

    (async () => {
      setDescriptor(await DescriptorFile.getFile(state.handle));
    })();
  }, [state]);

  useEffect(() => {
    if (descriptor) {
      document.title = descriptor?.name + ' - ' + t('app.title');
    }
  }, [descriptor, t]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {descriptor && descriptor.name} - {t('app.title')}
      </Typography>
      <CreatorForm test="Ah">
        <Box mb={2}>Bah</Box>
      </CreatorForm>
    </>
  );
}