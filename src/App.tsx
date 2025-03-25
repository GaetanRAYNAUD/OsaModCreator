import { theme } from '@assets/styles/theme.ts'
import DefaultLayout from '@components/layout/Default.tsx'
import { ThemeProvider } from '@mui/material'
import './App.css'
import { BrowserRouter } from 'react-router'
import './i18n'

function App() {

  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
