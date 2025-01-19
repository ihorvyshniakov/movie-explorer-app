import { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../store/store'
import CircleLoader from '../CircleLoader/CircleLoader'
import { getTopRatedMovies } from '../../store/https'

const MovieCardList = () => {
    const { searchInput, searchMoviesList } = useStoreContext()
    const [moviesFilteredBySearch, setMoviesFilteredBySearch] = useState([])

    const { topRatedMoviesList, setTopRatedMoviesList } = useStoreContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (topRatedMoviesList.length === 0) {
            setIsLoading(true)

            getTopRatedMovies()
                .then((moviesList) => {
                    setTopRatedMoviesList(moviesList)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                })
        }

        // eslint-disable-next-line
    }, [])

    const scrollToElementIfItWasOpened = (movieId) => {
        const scrollToElementId = localStorage.getItem('scrollToMovieId')

        if (scrollToElementId == movieId) {
            document
                .getElementById(scrollToElementId)
                .scrollIntoView({ behavior: 'smooth', block: 'center' })
            localStorage.removeItem('scrollToMovieId')
        }
    }

    useEffect(() => {
        if (searchMoviesList.length > 0) {
            setMoviesFilteredBySearch(searchMoviesList)
        } else {
            setMoviesFilteredBySearch(topRatedMoviesList)
        }
    }, [topRatedMoviesList, searchMoviesList])

    useEffect(() => {
        if (searchInput === '') {
            setMoviesFilteredBySearch(topRatedMoviesList)
        }
    }, [searchInput])

    if (error || moviesFilteredBySearch.length === 0) {
        return (
            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                {error}
            </Alert>
        )
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
            <CircleLoader isLoading={isLoading} />
            {moviesFilteredBySearch.length > 0 &&
                moviesFilteredBySearch.map(({ ...movie }) => (
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
