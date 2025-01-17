import { memo, useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../store/store'
import CircleLoader from '../CircleLoader/CircleLoader'

const MovieCardList = memo(function MovieCardList({
    moviesList,
    isLoading,
    error,
}) {
    const { searchInput } = useStoreContext()
    const [moviesFilteredBySearch, setMoviesFilteredBySearch] = useState([])

    useEffect(() => {
        setMoviesFilteredBySearch(
            moviesList.filter(({ title }) =>
                title.toLowerCase().includes(searchInput)
            )
        )
    }, [moviesList, searchInput])

    useEffect(() => {
        setMoviesFilteredBySearch(moviesList)
    }, [moviesList])

    const scrollToElementIfItWasOpened = (movieId) => {
        const scrollToElementId = localStorage.getItem('scrollToMovieId')

        if (scrollToElementId == movieId) {
            document
                .getElementById(scrollToElementId)
                .scrollIntoView({ behavior: 'smooth', block: 'center' })
            localStorage.removeItem('scrollToMovieId')
        }
    }

    if (error) {
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
            sx={{ marginBottom: '4rem' }}
        >
            <CircleLoader isLoading={isLoading} />
            {moviesFilteredBySearch.length > 0 &&
                moviesFilteredBySearch.map(({ ...movie }) => (
                    <Grid
                        size={4}
                        display="flex"
                        justifyContent="center"
                        key={movie.id}
                        id={movie.id}
                        onLoad={() => scrollToElementIfItWasOpened(movie.id)}
                    >
                        <MovieCard {...movie} />
                    </Grid>
                ))}
        </Grid>
    )
})

export default MovieCardList
