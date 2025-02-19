import {
    Container,
    useColorScheme,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import { motion } from 'motion/react'

import { Link } from '../index'

const MotionIconButton = motion.create(IconButton)
const MotionTypography = motion.create(Typography)

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
                        <Tooltip title="Dark / Light mode">
                            <MotionIconButton
                                size="large"
                                aria-label="change mode button"
                                color="inherit"
                                onClick={handleModeChange}
                                initial={{ scale: 0 }}
                                whileInView={{
                                    scale: [0, 1],
                                }}
                                transition={{ type: 'spring', delay: 1.1 }}
                            >
                                <Brightness6Icon />
                            </MotionIconButton>
                        </Tooltip>
                        <Link
                            url=""
                            sx={{
                                flexGrow: 1,
                                perspective: 180,
                            }}
                        >
                            <MotionTypography
                                align="center"
                                variant="h6"
                                noWrap
                                component="p"
                                sx={{ userSelect: 'none' }}
                                viewport={{ once: true }}
                                initial={{ scale: 0 }}
                                whileInView={{
                                    scale: 1,
                                    transition: {
                                        type: 'spring',
                                        delay: 0.5,
                                        duration: 0.8,
                                    },
                                }}
                            >
                                Movie Explorer
                            </MotionTypography>
                        </Link>

                        <Tooltip title="Project code on Github">
                            <MotionIconButton
                                size="large"
                                aria-label="github link"
                                color="inherit"
                                href="https://github.com/ihorvyshniakov/movie-explorer-app"
                                initial={{ scale: 0 }}
                                whileInView={{
                                    scale: [0, 1],
                                }}
                                transition={{ type: 'spring', delay: 1.1 }}
                            >
                                <GitHubIcon />
                            </MotionIconButton>
                        </Tooltip>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header
