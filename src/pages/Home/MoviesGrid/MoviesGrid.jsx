import { useCallback, useEffect } from 'react'
import { Grid2 as Grid, Skeleton, Typography } from '@mui/material'
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
import GridPagination from '../GridPagination/GridPagination'

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

    const fetchTopRatedMovies = useCallback((pageNumber) => {
        setIsMoviesLoading(true)
        getTopRatedMovies(pageNumber)
            .then((details) => {
                setMovies({
                    name: 'topRated',
                    value: {
                        title: 'Top rated',
                        details,
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
        const querySearch = searchParams.get('search') || ''
        const queryPage = Number(searchParams.get('page')) || 1

        if (!querySearch && queryPage) {
            fetchTopRatedMovies(queryPage)
        }
        // eslint-disable-next-line
    }, [searchParams])

    useEffect(() => {
        const search = searchParams.get('search') || ''

        if (search || movieId) {
            if (movies.search.details?.results.length) {
                setShowingMovies(MOVIES_SEARCH)
            } else {
                setShowingMovies(MOVIES_TOP_RATED)
            }
        } else {
            if (movies.topRated.details?.results.length) {
                setError(null)
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
        <Grid container spacing={2} display="grid" marginBottom={8}>
            {!isMoviesLoading && !error ? (
                <Typography variant="body1" color="textPrimary">
                    {`"${movies[showingMovies].title}" results`}
                </Typography>
            ) : (
                <Skeleton
                    variant="rounded"
                    height="1.5rem"
                    sx={{
                        width: '8rem',
                    }}
                />
            )}
            <Grid
                container
                spacing={2}
                columns={{ xs: 4, sm: 8, md: 12 }}
                gridTemplateColumns={{
                    xs: '1fr',
                    sm: '1fr 1fr',
                    lg: '1fr 1fr 1fr 1fr',
                }}
                sx={{ width: '100%', display: 'grid' }}
            >
                {isMoviesLoading ? (
                    <MoviesGridSkeleton />
                ) : (
                    movies[showingMovies].details.results.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                )}
            </Grid>

            <GridPagination />
        </Grid>
    )
}

export default MoviesGrid
