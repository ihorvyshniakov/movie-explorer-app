import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../store/store'
import { getMoviesBySearch, getTopRatedMovies } from '../../store/https'
import { scrollToElementIfItWasOpened } from '../../utils/utils'

// http://localhost:5173/?search=matrix

const MovieCardList = ({ setIsLoading }) => {
    const {
        setSearchInput,
        searchMoviesList,
        setSearchMoviesList,
        topRatedMoviesList,
        setTopRatedMoviesList,
    } = useStoreContext()
    let [searchParams] = useSearchParams()

    const [error, setError] = useState(null)
    const displayList = searchMoviesList.length
        ? searchMoviesList
        : topRatedMoviesList

    // if SEARCH -> getSearchMovies
    // else -> getTopRatedMovies
    useEffect(() => {
        const searchInputFromURL = searchParams.get('search')

        if (searchInputFromURL) {
            setSearchInput(searchInputFromURL)

            setIsLoading(true)
            getMoviesBySearch(searchInputFromURL)
                .then((movies) => {
                    setSearchMoviesList(movies)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                })
        } else {
            setSearchMoviesList([])

            setIsLoading(true)
            getTopRatedMovies()
                .then((movies) => {
                    setTopRatedMoviesList(movies)
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
            gridTemplateColumns={{
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
            }}
            sx={{ marginBottom: '4rem', display: 'grid' }}
        >
            {displayList.map(({ ...movie }) => (
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
