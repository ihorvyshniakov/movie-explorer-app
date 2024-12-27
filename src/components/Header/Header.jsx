import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        align="center"
                        variant="h6"
                        noWrap
                        component="p"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        Movie Explorer
                    </Typography>
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
