import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'

import Link from '../Link/Link'

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
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
            </AppBar>
        </Box>
    )
}

export default Header
