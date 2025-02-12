import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Grid2,
    Typography,
} from '@mui/material'

import { randomIntFromInterval } from '../../utils/utils'
import { useEffect, useState } from 'react'

const quotes = [
    {
        id: 1,
        movie: 'Star Wars (1977)',
        quote: 'May the Force be with you.',
    },
    {
        id: 2,
        movie: 'The Godfather (1972)',
        quote: "I'm gonna make him an offer he can't refuse.",
    },
    {
        id: 3,
        movie: 'The Pride of the Yankees (1943)',
        quote: 'Today, I consider myself the luckiest man on the face of the earth.',
    },
    {
        id: 4,
        movie: 'Apollo 13 (1995)',
        quote: 'Houston, we have a problem.',
    },
    {
        id: 5,
        movie: 'Frankenstein (1931)',
        quote: "It's alive!  It's alive!",
    },
    {
        id: 6,
        movie: 'The Adventures of Sherlock Holmes (1939)',
        quote: 'Elementary, my dear Watson.',
    },
    {
        id: 7,
        movie: 'Terminator 2:  Judgment Day (1991)',
        quote: 'Hasta la vista, baby.',
    },
    {
        id: 8,
        movie: 'The Lord of the Rings: The Two Towers (2002)',
        quote: 'My precious.',
    },
]

const Footer = () => {
    const [randomQuote, setRandomQuote] = useState(null)

    useEffect(() => {
        const randomNumber = randomIntFromInterval(
            quotes[0].id,
            quotes[quotes.length - 1].id
        )
        setRandomQuote(quotes.find(({ id }) => id === randomNumber))
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
                                <Alert
                                    icon={false}
                                    sx={{
                                        minWidth: {
                                            xs: 280,
                                            md: 320,
                                        },
                                        bgcolor: 'background.default',
                                    }}
                                >
                                    <AlertTitle color="textPrimary">
                                        {randomQuote.quote}
                                    </AlertTitle>
                                    {randomQuote.movie}
                                </Alert>
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
