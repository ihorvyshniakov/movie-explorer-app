import { Box, Fab, Fade, useScrollTrigger } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// https://mui.com/material-ui/react-app-bar/#back-to-top

const ScrollTopButton = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).getElementById(
            'back-to-top-anchor'
        )

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }

    return (
        <>
            <Fade in={trigger}>
                <Box
                    onClick={handleClick}
                    role="presentation"
                    sx={{ position: 'fixed', bottom: '3rem', right: '2rem' }}
                >
                    <Fab
                        size="medium"
                        color="secondary"
                        aria-label="scroll back to top"
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Fade>
        </>
    )
}

export default ScrollTopButton
