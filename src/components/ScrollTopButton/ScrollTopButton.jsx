import { Box, Fab, Fade, useScrollTrigger } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { motion, useAnimation } from 'motion/react'

import { scrollToTop } from '../../utils'

// https://mui.com/material-ui/react-app-bar/#back-to-top

const MotionBox = motion.create(Box)

const ScrollTopButton = () => {
    const controls = useAnimation()

    const handleTap = async () => {
        await controls.start({
            // Always begin animation from start
            scale: [0.5, 1.3, 0.8, 1],
            transition: { duration: 0.6, ease: 'easeInOut' },
        })
    }

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })

    return (
        <>
            <Fade in={trigger}>
                <MotionBox
                    onClick={scrollToTop}
                    role="presentation"
                    sx={{ position: 'fixed', bottom: '3rem', right: '2rem' }}
                    initial={{ scale: 1 }}
                    animate={controls}
                    onTap={handleTap}
                >
                    <Fab
                        size="medium"
                        color="secondary"
                        aria-label="scroll back to top"
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </MotionBox>
            </Fade>
        </>
    )
}

export default ScrollTopButton
