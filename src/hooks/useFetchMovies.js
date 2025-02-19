import { useCallback } from 'react'

import { useStoreContext } from '../context/StoreContext'
import { MOVIES_SEARCH, MOVIES_TOP_RATED } from '../data/constants'
import { getMoviesBySearch, getTopRatedMovies } from '../context/requests'

export default function useFetchMovies() {
    const { setError, setMovies, setTotalPages, setIsMoviesLoading } =
        useStoreContext()

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

    return { fetchTopRatedMovies, fetchSearchMovies }
}
