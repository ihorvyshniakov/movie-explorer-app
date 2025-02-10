import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { useParams, useSearchParams } from 'react-router'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../../context/StoreContext'
import { getTopRatedMovies } from '../../../context/requests'
import Error from '../../../components/Error/Error'
import MoviesGridSkeleton from './MoviesGridSkeleton'

const MoviesGrid = ({ isLoading, setIsLoading }) => {
    const {
        error,
        setError,
        searchMoviesList,
        showingMovies,
        setShowingMovies,
        topRatedMoviesList,
        setTopRatedMoviesList,
    } = useStoreContext()

    const { movieId } = useParams()
    const [searchParams] = useSearchParams()

    const fetchTopRatedMovies = useCallback(() => {
        setIsLoading(true)
        getTopRatedMovies()
            .then((movies) => {
                setTopRatedMoviesList(movies)
                setShowingMovies(movies)
                setError(null)
            })
            .catch((error) => {
                setShowingMovies([])
                setError({
                    error: error.message,
                    message: 'Top rated movies request failed',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        const searchInputFromURL = searchParams.get('search') || ''
        const isLoadTopRatedMovies =
            !topRatedMoviesList.length && !searchInputFromURL.length

        if (isLoadTopRatedMovies) {
            fetchTopRatedMovies()
        }
        // eslint-disable-next-line
    }, [searchParams])

    useEffect(() => {
        const search = searchParams.get('search') || ''

        if (search || movieId) {
            if (searchMoviesList.length) {
                setShowingMovies(searchMoviesList)
            } else {
                setShowingMovies(topRatedMoviesList)
            }
        } else {
            if (topRatedMoviesList.length) {
                setShowingMovies(topRatedMoviesList)
            } else {
                setShowingMovies([])
            }
        }
        // eslint-disable-next-line
    }, [searchParams, movieId, setShowingMovies])

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
            {isLoading && <MoviesGridSkeleton />}
            {!isLoading &&
                showingMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
        </Grid>
    )
}

export default MoviesGrid
