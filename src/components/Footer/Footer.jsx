import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Grid2,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

import { randomIntFromInterval } from '../../utils'
import { QUOTES } from '../../data/constants'

const MotionAlert = motion.create(Alert)

const Footer = () => {
    const [randomQuote, setRandomQuote] = useState(null)

    useEffect(() => {
        const randomNumber = randomIntFromInterval(
            QUOTES[0].id,
            QUOTES[QUOTES.length - 1].id
        )
        setRandomQuote(QUOTES.find(({ id }) => id === randomNumber))
    }, [])

    return (
        <footer>
            <Box sx={{ bgcolor: 'primary.main' }}>
                <Container maxWidth="lg">
                    <Grid2 container spacing={4} padding="4rem 0 6rem">
                        <Grid2
                            size={12}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={4}
                        >
                            <Typography
                                align="center"
                                color="textPrimary"
                                sx={{
                                    typography: {
                                        xs: 'h5',
                                        md: 'h4',
                                    },
                                }}
                            >
                                Random movie quote for you 😉
                            </Typography>

                            {randomQuote && (
                                <MotionAlert
                                    icon={false}
                                    sx={{
                                        minWidth: {
                                            xs: 280,
                                            md: 320,
                                        },
                                        bgcolor: 'background.default',
                                    }}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: [50, -8, 4, 0],
                                    }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <AlertTitle color="textPrimary">
                                        {randomQuote.quote}
                                    </AlertTitle>
                                    {randomQuote.movie}
                                </MotionAlert>
                            )}
                            <Typography
                                align="center"
                                variant="h6"
                                color="textPrimary"
                            >
                                Developed by Ihor Vyshniakov <br /> 2025
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer
