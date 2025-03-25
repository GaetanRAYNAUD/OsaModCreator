import { createTheme, responsiveFontSizes } from '@mui/material'
import React from 'react'

export enum COLORS {
   PRIMARY = '#242424',
  SECONDARY = 'rgba(255, 255, 255, 0.87)',
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    default: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    default?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    default: true
  }
}

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    secondary: true
  }
}

const spacing = 8

const baseTheme = createTheme({
  spacing,
  palette: {
    primary: { main: COLORS.PRIMARY },
    secondary: { main: COLORS.SECONDARY },
    contrastThreshold: 2,
  },
  typography: {
    fontSize: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.SECONDARY,
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          "@media (hover: none)": {
            "&:hover": {
              backgroundColor: `white`,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "initial",
        },
      },
    },
  },
})

baseTheme.typography.default = {
  ...baseTheme.typography.body1,
}

baseTheme.typography.body1 = {
  ...baseTheme.typography.body1,
  fontSize: "0.70rem",
  [baseTheme.breakpoints.up("sm")]: {
    fontSize: "0.75rem",
  },
  [baseTheme.breakpoints.up("md")]: {
    fontSize: "0.80rem",
  },
  [baseTheme.breakpoints.up("lg")]: {
    fontSize: "0.85rem",
  },
}

baseTheme.typography.body2 = {
  ...baseTheme.typography.body2,
  fontSize: "0.65rem",
  [baseTheme.breakpoints.up("sm")]: {
    fontSize: "0.70rem",
  },
  [baseTheme.breakpoints.up("md")]: {
    fontSize: "0.75rem",
  },
  [baseTheme.breakpoints.up("lg")]: {
    fontSize: "0.80rem",
  },
}

const theme = responsiveFontSizes(baseTheme)

export { theme, spacing }
