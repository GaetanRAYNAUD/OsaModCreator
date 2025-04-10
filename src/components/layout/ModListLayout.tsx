import { COLORS } from '@assets/styles/theme.ts';
import { StateContext } from '@components/layout/Default.tsx';
import { ModLayout } from '@components/layout/ModLayout.tsx';
import { Edit } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardHeader, Grid2 } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ModListLayout() {
  const { globalState, setGlobalState } = useContext(StateContext)!;
  const [files, setFiles] = useState<FileSystemFileHandle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (globalState && globalState.handle && globalState.item && globalState.item.folder) {
        setFiles(await globalState.item.folder.listFiles(globalState.handle));
      }
    })();
  }, [globalState]);

  const onClick = (name: string): void => {
    if (globalState && globalState.handle && globalState.item && globalState.item.folder && globalState.item.fileProvider) {
      setGlobalState({
        ...globalState, item: {
          ...globalState.item,
          file: globalState.item.fileProvider(name),
        },
      });
      navigate(name);
    }
  };

  return (
    <ModLayout dark>
      {
        files.map(file => (
          <Grid2 key={ file.name } justifyContent="center" size={ 12 }
                 sx={ { backgroundColor: COLORS.SECONDARY_DARK } }>
            <Card
              sx={ {
                height: '100%',
                cursor: 'pointer',
              } }
              onClick={ () => onClick(file.name) }
            >
              <CardActionArea>
                <CardHeader title={ file.name } slotProps={ { title: { variant: 'h5' } } }
                            action={ <Avatar
                              sx={ { backgroundColor: 'white', color: COLORS.PRIMARY_MAIN } }><Edit /></Avatar> } />
              </CardActionArea>
            </Card>
          </Grid2>
        ))
      }
    </ModLayout>
  );
}
