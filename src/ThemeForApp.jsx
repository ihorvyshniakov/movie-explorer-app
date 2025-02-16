import { createTheme, ThemeProvider } from '@mui/material'
import { common } from '@mui/material/colors'

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
                hoverBorder: {
                    border: common.white,
                    line: blockLight,
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
                hoverBorder: {
                    border: blockLight,
                    line: common.white,
                },
            },
        },
    },
})

const ThemeForApp = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default ThemeForApp
