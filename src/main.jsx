import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App.jsx'
import { StoreContextProvider } from './context/StoreContext.jsx'

const theme = createTheme({
    palette: {
        primary: {
            main: '#C2B0FF',
        },
        secondary: {
            main: '#EF6351',
        },
        info: {
            main: '#ffc107',
        },
    },
    colorSchemes: {
        dark: true,
    },
})

createRoot(document.getElementById('root')).render(
    <StoreContextProvider>
        <CssBaseline />
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StoreContextProvider>
)
