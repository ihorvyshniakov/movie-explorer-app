import { Box, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useEffect, useState } from 'react'

import { getMovieDetailsById } from '../../context/requests'
import TwoColumnTable from '../../components/TwoColumnTable/TwoColumnTable'
import Image from '../../components/Image/Image'
import Error from '../../components/Error/Error'
import MovieSkeleton from './MovieSkeleton'

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

const Movie = ({ movieId }) => {
    const [error, setError] = useState(null)
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (movieId) {
            setIsLoading(true)
            getMovieDetailsById(movieId)
                .then((movieDetails) => {
                    setMovieDetails(movieDetails)
                    setError(null)
                })
                .catch((error) => {
                    setError({
                        error: error.message,
                        message:
                            'Whoops, movie details request failed or \nDatabase do not have an extra info 🤷‍♂️',
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [movieId])

    if (error) {
        return <Error {...error} />
    }

    if (movieDetails) {
        var {
            title,
            overview,
            poster_path,
            vote_average,
            vote_count,
            release_date,
            genres,
            production_companies,
            production_countries,
            budget,
            revenue,
        } = movieDetails

        var tableInfo = [
            {
                name: 'Production companies',
                value:
                    production_companies.reduce((stack, el) => {
                        if (stack.length === 0) {
                            return el.name
                        } else {
                            return `${stack}, ${el.name}`
                        }
                    }, '') || 'Unknown',
            },
            {
                name: 'Production countries',
                value:
                    production_countries.reduce((stack, el) => {
                        if (stack.length === 0) {
                            return el.name
                        } else {
                            return `${stack}, ${el.name}`
                        }
                    }, '') || 'Unknown',
            },
            { name: 'Budget', value: budget || 0 },
            { name: 'Revenue', value: revenue || 0 },
        ]
    }

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 6, md: 12 }}
                sx={{
                    padding: '.5rem .5rem 1rem',
                    overflow: 'auto',
                    maxHeight: 'calc(80vh - 2rem)',
                }}
            >
                {isLoading && <MovieSkeleton />}
                {movieDetails && (
                    <>
                        <Grid
                            size={{ sm: 12, md: 5 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%' }}
                        >
                            <Box sx={{ minWidth: 300 }}>
                                <Image
                                    title={title}
                                    url={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                    preloaderHeight={500}
                                    elevation={3}
                                    square={false}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            container
                            size={{ sm: 12, md: 7 }}
                            spacing={2}
                            sx={{
                                display: 'grid',
                                gridTemplateRows: 'repeat(5, min-content)',
                            }}
                        >
                            <Grid>
                                <Typography
                                    gutterBottom
                                    component="h1"
                                    color="textPrimary"
                                    sx={{
                                        margin: 0,
                                        typography: {
                                            xs: 'h5',
                                            md: 'h4',
                                        },
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {overview}
                                </Typography>
                            </Grid>
                            <Grid container spacing={1} direction="column">
                                <Grid>
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        color="textPrimary"
                                    >
                                        {`Release - ${formatDate(release_date)}`}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <StarsIcon color="info" />
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            color="textPrimary"
                                        >
                                            {vote_average.toFixed(2)}
                                            {` (${vote_count} votes)`}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            {genres.length > 0 && (
                                <Grid>
                                    <Stack
                                        direction="row"
                                        sx={{ flexWrap: 'wrap', gap: '0.5rem' }}
                                    >
                                        {genres.map(({ id, name }) => (
                                            <Chip
                                                key={id}
                                                label={name}
                                                color="secondary"
                                            />
                                        ))}
                                    </Stack>
                                </Grid>
                            )}
                            <Grid display="flex" justifyContent="center">
                                <TwoColumnTable rows={tableInfo} />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    )
}

export default Movie
