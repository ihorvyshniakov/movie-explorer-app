import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { useParams, useSearchParams } from 'react-router'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../../context/StoreContext'
import { getTopRatedMovies } from '../../../context/requests'
import Error from '../../../components/Error/Error'
import MoviesGridSkeleton from './MoviesGridSkeleton'
import {
    MOVIES_EMPTY,
    MOVIES_SEARCH,
    MOVIES_TOP_RATED,
} from '../../../data/constants'

const MoviesGrid = () => {
    const {
        error,
        movies,
        showingMovies,
        isMoviesLoading,

        setError,
        setMovies,
        setShowingMovies,
        setIsMoviesLoading,
    } = useStoreContext()

    const { movieId } = useParams()
    const [searchParams] = useSearchParams()

    const fetchTopRatedMovies = useCallback(() => {
        setIsMoviesLoading(true)
        getTopRatedMovies()
            .then((movies) => {
                setMovies({
                    name: 'topRated',
                    value: {
                        title: 'Top rated',
                        list: movies,
                    },
                })
                setShowingMovies(MOVIES_TOP_RATED)
                setError(null)
            })
            .catch((error) => {
                setShowingMovies(MOVIES_EMPTY)
                setError({
                    error: error.message,
                    message: 'Top rated movies request failed',
                })
            })
            .finally(() => {
                setIsMoviesLoading(false)
            })
    }, [])

    useEffect(() => {
        const searchInputFromURL = searchParams.get('search') || ''
        const isLoadTopRatedMovies =
            !movies.topRated.list.length && !searchInputFromURL.length

        if (isLoadTopRatedMovies) {
            fetchTopRatedMovies()
        }
        // eslint-disable-next-line
    }, [searchParams])

    useEffect(() => {
        const search = searchParams.get('search') || ''

        if (search || movieId) {
            if (movies.search.list.length) {
                setShowingMovies(MOVIES_SEARCH)
            } else {
                setShowingMovies(MOVIES_TOP_RATED)
            }
        } else {
            if (movies.topRated.list.length) {
                setShowingMovies(MOVIES_TOP_RATED)
            } else {
                setShowingMovies(MOVIES_EMPTY)
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
            {isMoviesLoading ? (
                <MoviesGridSkeleton />
            ) : (
                movies[showingMovies].list.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))
            )}
        </Grid>
    )
}

export default MoviesGrid
