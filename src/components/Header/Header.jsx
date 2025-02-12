import {
    Container,
    useColorScheme,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness6Icon from '@mui/icons-material/Brightness6'

import Link from '../Link/Link'

const Header = (props) => {
    const { mode, setMode } = useColorScheme()

    const handleModeChange = () => {
        setMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <>
            <span id="back-to-top-anchor"></span>
            <AppBar position="sticky" {...props}>
                <Container maxWidth="lg" sx={{ display: 'flex' }}>
                    <Toolbar disableGutters sx={{ width: '100%' }}>
                        <IconButton
                            size="large"
                            aria-label="change mode button"
                            color="inherit"
                            onClick={handleModeChange}
                        >
                            <Brightness6Icon />
                        </IconButton>
                        <Link
                            url=""
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                                noWrap
                                component="p"
                                sx={{ userSelect: 'none' }}
                            >
                                Movie Explorer
                            </Typography>
                        </Link>

                        <IconButton
                            size="large"
                            aria-label="github link"
                            color="inherit"
                            href="#"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header
