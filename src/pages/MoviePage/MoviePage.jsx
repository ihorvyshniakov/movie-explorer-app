import { Alert, AlertTitle, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { getMovieDetailsById } from '../../store/https'
import CircleLoader from '../../components/CircleLoader/CircleLoader'

const MoviePage = () => {
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    let { pathname, ...location } = useLocation()
    const movieID = useRef(null)

    useEffect(() => {
        if (pathname.length) {
            movieID.current = pathname.split('/')[2] || null
        }
    }, [location, pathname])

    useEffect(() => {
        if (movieID) {
            setIsLoading(true)
            getMovieDetailsById(movieID.current)
                .then((movieDetails) => {
                    setMovieDetails(movieDetails)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                })
        }
    }, [movieID])

    if (error) {
        return (
            <Alert severity="error" sx={{ margin: '1rem 0' }}>
                <AlertTitle>{error}</AlertTitle>
                The request for details about this movie failed
            </Alert>
        )
    }

    if (movieDetails) {
        var {
            title,
            overview,
            backdrop_path,
            poster_path,
            vote_average,
            release_date,
        } = movieDetails
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                columns={{ xs: 6, sm: 12, md: 12 }}
                sx={{ margin: '1rem 0 4rem' }}
            >
                <CircleLoader isLoading={isLoading} />
                {movieDetails && (
                    <>
                        <Grid size={4} display="flex" justifyContent="center">
                            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                                <img
                                    style={{ width: '100%' }}
                                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                    alt={`${title} poster`}
                                />
                            </Paper>
                        </Grid>
                        <Grid size={8}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h1"
                                sx={{ height: '4rem' }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    marginBottom: '1rem',
                                }}
                                className="ellipsis-4-lines"
                            >
                                {overview}
                            </Typography>
                            <Grid
                                container
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <StarsIcon sx={{ color: 'orange' }} />
                                        <Typography variant="h6" component="p">
                                            {vote_average.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid>
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        align="right"
                                    >
                                        {release_date.slice(0, 4)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    )
}

export default MoviePage
