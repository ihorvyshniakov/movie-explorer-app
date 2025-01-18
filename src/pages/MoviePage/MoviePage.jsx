import { Alert, AlertTitle, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getMovieDetailsById } from '../../store/https'
import CircleLoader from '../../components/CircleLoader/CircleLoader'

const MoviePage = () => {
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { movieId } = useParams()

    useEffect(() => {
        if (movieId) {
            setIsLoading(true)
            getMovieDetailsById(movieId)
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
    }, [movieId])

    useEffect(() => {
        // save movie id for scrolling on home page
        localStorage.setItem('scrollToMovieId', movieId)
    }, [])

    if (error) {
        return (
            <Alert severity="error" sx={{ margin: '4rem 0 0' }}>
                <AlertTitle>{error || 'Whoops...'}</AlertTitle>
                Whoops, movie details request failed or Database do not have an
                extra info 🤷‍♂️
            </Alert>
        )
    }

    if (movieDetails) {
        var { title, overview, poster_path, vote_average, release_date } =
            movieDetails
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
