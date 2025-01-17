import {
    Alert,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
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
                {error}
            </Alert>
        )
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ margin: '1rem 0 4rem' }}
            >
                <CircleLoader isLoading={isLoading} />
                {movieDetails && (
                    <Grid
                        size={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h1"
                                        component="p"
                                    >
                                        {movieDetails.title}
                                    </Typography>
                                    {/* <Typography
                                        variant="body2"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        Lizards are a widespread group of squamate
                                        reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography> */}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default MoviePage
