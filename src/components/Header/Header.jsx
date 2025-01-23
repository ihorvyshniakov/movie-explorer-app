import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'

import Link from '../Link/Link'

const Header = (props) => {
    return (
        <>
            <span id="back-to-top-anchor"></span>
            <AppBar position="sticky" {...props}>
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
            </AppBar>
        </>
    )
}

export default Header
