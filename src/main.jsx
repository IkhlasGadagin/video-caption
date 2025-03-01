import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </SnackbarProvider>
  </StrictMode>,
)
