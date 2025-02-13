import { useCallback, useEffect, useState } from 'react'
import { Grid2 as Grid, Skeleton, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'react-router'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../../context/StoreContext'
import { getMoviesBySearch, getTopRatedMovies } from '../../../context/requests'
import Error from '../../../components/Error/Error'
import MoviesGridSkeleton from './MoviesGridSkeleton'
import { MOVIES_TOP_RATED, MOVIES_SEARCH } from '../../../data/constants'
import GridPagination from '../GridPagination/GridPagination'

const MoviesGrid = () => {
    const {
        error,
        movies,

        setError,
        setMovies,
        setIsMoviesLoading,
    } = useStoreContext()
    const [show, setShow] = useState(null)

    const { movieId } = useParams()
    const [searchParams] = useSearchParams()

    const fetchTopRatedMovies = useCallback(
        (pageNumber) => {
            setError(null)
            setIsMoviesLoading(true)
            getTopRatedMovies(pageNumber)
                .then((details) => {
                    setMovies({
                        name: MOVIES_TOP_RATED,
                        value: {
                            title: 'Top rated',
                            details,
                        },
                    })
                })
                .catch((error) => {
                    setError({
                        error: error.message,
                        message: 'Top rated movies request failed',
                    })
                })
                .finally(() => {
                    setIsMoviesLoading(false)
                })
        },
        [setError, setIsMoviesLoading, setMovies]
    )

    const fetchSearchMovies = useCallback(
        (movieTitle, pageNumber) => {
            setError(null)
            setIsMoviesLoading(true)
            getMoviesBySearch(movieTitle, pageNumber)
                .then((details) => {
                    setMovies({
                        name: MOVIES_SEARCH,
                        value: {
                            title: movieTitle,
                            details,
                        },
                    })
                })
                .catch((error) => {
                    setError({
                        error: error.message,
                        message: `We didn't find any movie with "${movieTitle}" name. \nPlease try to find other movies 🙂`,
                    })
                })
                .finally(() => {
                    setIsMoviesLoading(false)
                })
        },
        [setError, setIsMoviesLoading, setMovies]
    )

    useEffect(
        function showBasedOnURL() {
            const querySearch = searchParams.get('search')
            const queryPage = Number(searchParams.get('page'))

            let movies
            let page
            if (querySearch === null) {
                movies = MOVIES_TOP_RATED
            } else {
                movies = MOVIES_SEARCH
            }

            if (queryPage >= 10) {
                page = 10
            } else if (queryPage > 1) {
                page = queryPage
            } else {
                page = 1
            }

            setShow({ movies, page })
        },
        [searchParams, movieId]
    )

    useEffect(
        function fetchMovies() {
            if (!show) return

            const { movies, page } = show

            if (movies === MOVIES_TOP_RATED) {
                fetchTopRatedMovies(page)
            }
            if (movies === MOVIES_SEARCH) {
                const querySearch = searchParams.get('search')
                fetchSearchMovies(querySearch, page)
            }
        },
        [show]
    )

    if (error) {
        return <Error {...error} />
    }

    let showingList
    if (show) {
        showingList = movies[show.movies].details.results
    }

    return (
        <Grid container spacing={2} display="grid" marginBottom={8}>
            {show && movies[show.movies].title.length ? (
                <Typography variant="body1" color="textPrimary">
                    {`"${movies[show.movies].title}" movies, page - ${show.page}`}
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
                {showingList?.length ? (
                    showingList.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                ) : (
                    <MoviesGridSkeleton />
                )}
            </Grid>

            <GridPagination />
        </Grid>
    )
}

export default MoviesGrid
