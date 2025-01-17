import { useEffect, useState } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../store/store'

const MovieCardList = ({ moviesList, isLoading, error }) => {
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
            {isLoading && (
                <Grid
                    size={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '300px' }}
                >
                    <CircularProgress size="5rem" />
                </Grid>
            )}
            {moviesFilteredBySearch.length > 0 &&
                moviesFilteredBySearch.map(
                    ({
                        id,
                        title,
                        overview,
                        poster_path,
                        vote_average,
                        release_date,
                    }) => (
                        <Grid
                            size={4}
                            display="flex"
                            justifyContent="center"
                            key={id}
                        >
                            <MovieCard
                                title={title}
                                overview={overview}
                                poster_path={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                                vote_average={vote_average}
                                release_date={release_date}
                            />
                        </Grid>
                    )
                )}
        </Grid>
    )
}

export default MovieCardList
