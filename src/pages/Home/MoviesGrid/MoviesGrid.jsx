import { useEffect } from 'react'
import { Grid2 as Grid } from '@mui/material'
import { useParams, useSearchParams } from 'react-router'

import { Error, SearchDetails } from '../../../components'
import MovieCard from '../MovieCard/MovieCard'
import GridPagination from '../GridPagination/GridPagination'
import MoviesGridSkeleton from './MoviesGridSkeleton'
import { useStoreContext } from '../../../context/StoreContext'
import { MOVIES_TOP_RATED, MOVIES_SEARCH } from '../../../data/constants'
import { scrollToTop } from '../../../utils'
import useFetchMovies from '../../../hooks/useFetchMovies'

const MoviesGrid = () => {
    const {
        error,
        movies,
        show,

        setShow,
    } = useStoreContext()
    const { fetchTopRatedMovies, fetchSearchMovies } = useFetchMovies()

    const { movieId } = useParams()
    const [searchParams] = useSearchParams()

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
