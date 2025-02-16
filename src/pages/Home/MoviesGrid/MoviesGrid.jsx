import { useCallback, useEffect } from 'react'
import { Grid2 as Grid } from '@mui/material'
import { useParams, useSearchParams } from 'react-router'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../../context/StoreContext'
import { getMoviesBySearch, getTopRatedMovies } from '../../../context/requests'
import Error from '../../../components/Error/Error'
import MoviesGridSkeleton from './MoviesGridSkeleton'
import { MOVIES_TOP_RATED, MOVIES_SEARCH } from '../../../data/constants'
import GridPagination from '../GridPagination/GridPagination'
import { scrollToTop } from '../../../utils'
import SearchDetails from '../../../components/SearchDetails'

const MoviesGrid = () => {
    const {
        error,
        movies,
        show,

        setShow,
        setError,
        setMovies,
        setTotalPages,
        setIsMoviesLoading,
    } = useStoreContext()

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
                    setTotalPages(details.total_pages)
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
        [setError, setIsMoviesLoading, setMovies, setTotalPages]
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
                    setTotalPages(details.total_pages)
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
        [setError, setIsMoviesLoading, setMovies, setTotalPages]
    )

    useEffect(
        function showBasedOnURL() {
            if (movieId) return

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
        [searchParams, movieId, setShow]
    )

    useEffect(
        function fetchMovies() {
            if (!show) return
            if (isAlreadyCached()) return
            scrollToTop()

            const { movies: showMovies, page: showPage } = show
            if (showMovies === MOVIES_TOP_RATED) {
                fetchTopRatedMovies(showPage)
            }
            if (showMovies === MOVIES_SEARCH) {
                const querySearch = searchParams.get('search')
                fetchSearchMovies(querySearch, showPage)
            }

            function isAlreadyCached() {
                const { movies: showMovies, page: showPage } = show

                if (showMovies === MOVIES_TOP_RATED) {
                    const isTopRatedMoviesCached =
                        movies[showMovies].details.page === showPage

                    if (isTopRatedMoviesCached) return true
                }
                if (showMovies === MOVIES_SEARCH) {
                    const querySearch = searchParams.get('search')
                    const isSearchMoviesCached =
                        movies[showMovies].title === querySearch &&
                        movies[showMovies].details.page === showPage

                    if (isSearchMoviesCached) return true
                }

                return false
            }
        },
        // eslint-disable-next-line
        [show, fetchSearchMovies, fetchTopRatedMovies]
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
            <SearchDetails />

            <Grid
                container
                spacing={2}
                columns={{ xs: 4, sm: 8, md: 12 }}
                display="grid"
                gridTemplateColumns={{
                    xs: '1fr',
                    sm: '1fr 1fr',
                    lg: '1fr 1fr 1fr 1fr',
                }}
                sx={{ width: '100%' }}
            >
                {showingList?.length && !movies.isLoading ? (
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
