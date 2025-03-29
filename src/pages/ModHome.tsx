import { COLORS } from '@assets/styles/theme.ts';
import { DescriptorFile } from '@eu4/folders.ts';
import { itemCategories } from '@eu4/items.ts';
import { Descriptor } from '@eu4/types.ts';
import { ArrowDropDown } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AbsoluteLoader from '@components/AbsoluteLoader.tsx';
import { getRoutes } from '@routes';
import { useNavigate } from 'react-router-dom';

type Props = {
  handle: FileSystemDirectoryHandle,
}

export function ModHomePage({ handle }: Props) {
  const [descriptor, setDescriptor] = useState<Descriptor>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routes = getRoutes();

  useEffect(() => {
    (async () => {
      setDescriptor(await DescriptorFile.getFile(handle));
    })();
  }, [handle]);

  useEffect(() => {
    if (descriptor) {
      document.title = descriptor?.name + ' - ' + t('app.title');
    }
  }, [descriptor, t]);

  return (
    <>
      {
        descriptor ? (
            <>
              <Typography variant="h3" gutterBottom>
                {descriptor && descriptor.name} - {t('app.title')}
              </Typography>

              <Grid2 container spacing={2}>
                {
                  itemCategories.map((category) => (
                    <Grid2 key={category.name} justifyContent="center" spacing={2} size={12}>
                      <Accordion slotProps={{ heading: { component: 'h4' } }} expanded
                                 sx={{ backgroundColor: COLORS.SECONDARY_DARK }}>
                        <AccordionSummary
                          expandIcon={<ArrowDropDown />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography variant="h4">{t(`category.${category.name}.title`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid2 key={`grid-category-${category.name}`} container justifyContent="center" spacing={2}
                                 size={12}>
                            {
                              category.items.map((item) => (
                                <Grid2 key={`grid-item-${category.name}-${item.name}`}
                                       size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                  <Card
                                    sx={{ cursor: 'pointer', height: '100%' }}
                                    onClick={() => navigate(routes.DESCRIPTOR, { state: { handle } })}
                                  >
                                    <CardHeader
                                      title={
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                          <Avatar src={`/images/categories/${category.name}/${item.name}.png`}
                                                  variant="square"
                                                  sx={{
                                                    width: 24,
                                                    height: 24,
                                                    backgroundColor: COLORS.SECONDARY_MAIN,
                                                  }}>
                                            <div />
                                          </Avatar>
                                          <Typography
                                            variant="h5">{t(`category.${category.name}.${item.name}.title`)}</Typography>
                                        </Box>
                                      }
                                    />
                                    <CardContent>
                                      <Typography variant="body2">{t(
                                        `category.${category.name}.${item.name}.desc`)}</Typography>
                                    </CardContent>
                                  </Card>
                                </Grid2>
                              ))
                            }
                          </Grid2>
                        </AccordionDetails>
                      </Accordion>
                    </Grid2>
                  ))
                }
              </Grid2>
            </>
          )
          :
          (
            <AbsoluteLoader />
          )
      }
    </>
  );
}