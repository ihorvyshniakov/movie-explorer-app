import { Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getMovieDetailsById } from '../../store/https'
import CircleLoader from '../../components/CircleLoader/CircleLoader'
import MovieDetailsTable from '../../components/MovieDetailsTable/MovieDetailsTable'
import Image from '../../components/Image/Image'
import { useStoreContext } from '../../store/store'
import Error from '../../components/Error/Error'

const MoviePage = () => {
    const { error, setError } = useStoreContext()
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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
                    setError({
                        error: error.message,
                        message:
                            'Whoops, movie details request failed or \nDatabase do not have an extra info 🤷‍♂️',
                    })
                })
        }
    }, [movieId])

    useEffect(() => {
        // save movie id for scrolling on home page
        localStorage.setItem('scrollToMovieId', movieId)
    }, [])

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
                spacing={{ sm: 2, md: 6 }}
                columns={{ sm: 6, md: 12 }}
                sx={{ margin: '2rem 0 4rem' }}
            >
                <CircleLoader isLoading={isLoading} />
                {movieDetails && (
                    <>
                        <Grid
                            size={{ sm: 12, md: 5 }}
                            display="flex"
                            justifyContent="center"
                            sx={{ width: '100%' }}
                        >
                            <Image
                                title={title}
                                url={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                preloaderHeight={500}
                                elevation={3}
                                square={false}
                            />
                        </Grid>
                        <Grid
                            container
                            size={{ sm: 12, md: 7 }}
                            spacing={2}
                            sx={{
                                display: 'grid',
                                gridTemplateRows: 'repeat(5, min-content)',
                                marginTop: '1rem',
                            }}
                        >
                            <Grid>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="h1"
                                    sx={{ margin: 0 }}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography gutterBottom variant="body2">
                                    {overview}
                                </Typography>
                            </Grid>
                            <Grid container spacing={1} direction="column">
                                <Grid>
                                    <Typography variant="h6" component="p">
                                        {`Release: ${release_date}`}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <StarsIcon sx={{ color: 'orange' }} />
                                        <Typography variant="h6" component="p">
                                            {vote_average.toFixed(2)}
                                            {` (${vote_count} votes)`}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Stack
                                    direction="row"
                                    sx={{ flexWrap: 'wrap', gap: '0.5rem' }}
                                >
                                    {genres.map(({ id, name }) => (
                                        <Chip
                                            key={id}
                                            label={name}
                                            color="info"
                                        />
                                    ))}
                                </Stack>
                            </Grid>
                            <Grid>
                                <MovieDetailsTable rows={tableInfo} />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    )
}

export default MoviePage
