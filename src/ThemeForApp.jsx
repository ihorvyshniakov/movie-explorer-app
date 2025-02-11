import { createTheme, ThemeProvider } from '@mui/material'

const blockLight = '#C2B0FF'
const blockDark = '#1B4965'

const buttonLight = '#EF6351'
const buttonDark = '#C2B0FF'

const backgroundDark = '#7d6f38'

const yellow = '#FFC107'

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: blockLight,
                },
                secondary: {
                    main: buttonLight,
                },
                info: {
                    main: yellow,
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: blockDark,
                },
                secondary: {
                    main: buttonDark,
                },
                info: {
                    main: yellow,
                },
                background: {
                    default: backgroundDark,
                    paper: blockDark,
                },
            },
        },
    },
})

const ThemeForApp = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeForApp
