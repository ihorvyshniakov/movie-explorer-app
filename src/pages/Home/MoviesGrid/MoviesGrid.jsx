import { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { useSearchParams } from 'react-router'

import MovieCard from '../MovieCard/MovieCard'
import { useStoreContext } from '../../../context/StoreContext'
import { getTopRatedMovies } from '../../../context/requests'
import { scrollToElementIfItWasOpened } from '../../../utils/utils'
import Error from '../../../components/Error/Error'
import MoviesGridSkeleton from './MoviesGridSkeleton'

const MoviesGrid = ({ isLoading, setIsLoading }) => {
    const {
        error,
        setError,
        searchMoviesList,
        topRatedMoviesList,
        setTopRatedMoviesList,
    } = useStoreContext()
    const [searchParams] = useSearchParams()

    const fetchTopRatedMovies = useCallback(() => {
        setIsLoading(true)
        getTopRatedMovies()
            .then((movies) => {
                setTopRatedMoviesList(movies)
                setError(null)
            })
            .catch((error) => {
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
            {isLoading &&
                [...new Array(6)].map((el, index) => (
                    <MoviesGridSkeleton
                        key={`skeleton-${index}`}
                        isLoading={true}
                    />
                ))}

            {(searchMoviesList.length && !isLoading
                ? searchMoviesList
                : topRatedMoviesList.length && !isLoading
                  ? topRatedMoviesList
                  : []
            ).map(({ ...movie }) => (
                <Grid
                    size={4}
                    key={movie.id}
                    id={movie.id}
                    onLoad={() => scrollToElementIfItWasOpened(movie.id)}
                    display="flex"
                    justifyContent="center"
                    sx={{ width: '100%' }}
                >
                    <MovieCard {...movie} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MoviesGrid
