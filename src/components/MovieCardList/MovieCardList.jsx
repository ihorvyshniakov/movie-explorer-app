import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../store/store'
import { getTopRatedMovies } from '../../store/https'
import { scrollToElementIfItWasOpened } from '../../utils/utils'
import Error from '../Error/Error'

// http://localhost:5173/?search=matrix

const MovieCardList = ({ isLoading, setIsLoading }) => {
    const [error, setError] = useState(null)
    const { searchMoviesList, topRatedMoviesList, setTopRatedMoviesList } =
        useStoreContext()

    useEffect(() => {
        if (!topRatedMoviesList.length) {
            setIsLoading(true)
            getTopRatedMovies()
                .then((movies) => {
                    setTopRatedMoviesList(movies)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError({
                        error: error.message,
                        message: 'Top rated movies request failed',
                    })
                })
        }
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return null
    }

    if (error) {
        return <Error {...error} />
    }

    return (
        <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12 }}
            gridTemplateColumns={{
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
            }}
            sx={{ marginBottom: '4rem', display: 'grid' }}
        >
            {(searchMoviesList.length
                ? searchMoviesList
                : topRatedMoviesList
            ).map(({ ...movie }) => (
                <Grid
                    size={4}
                    key={movie.id}
                    id={movie.id}
                    onLoad={() => scrollToElementIfItWasOpened(movie.id)}
                    sx={{ width: '100%' }}
                >
                    <MovieCard {...movie} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MovieCardList
