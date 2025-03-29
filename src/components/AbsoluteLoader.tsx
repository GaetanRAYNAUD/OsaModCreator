import CircularProgress from '@mui/material/CircularProgress';
import { COLORS } from '@assets/styles/theme.ts';
import { Box } from '@mui/material';

const AbsoluteLoader = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      minHeight: '100vh',
      zIndex: 1500,
    }}>
      <CircularProgress size={42} sx={{
        fontSize: 'calc(10px + 2vmin)',
        color: COLORS.SECONDARY_MAIN,
      }} />
    </Box>
  );
};

export default AbsoluteLoader;
