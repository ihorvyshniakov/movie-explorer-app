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
    const { searchInput, moviesBasedOnSearch } = useStoreContext()
    const [moviesFilteredBySearch, setMoviesFilteredBySearch] = useState([])

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
        if (moviesBasedOnSearch.length > 0) {
            setMoviesFilteredBySearch(moviesBasedOnSearch)
        } else {
            setMoviesFilteredBySearch(moviesList)
        }
    }, [moviesList, moviesBasedOnSearch])

    useEffect(() => {
        if (searchInput === '') {
            setMoviesFilteredBySearch(moviesList)
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
})

export default MovieCardList
