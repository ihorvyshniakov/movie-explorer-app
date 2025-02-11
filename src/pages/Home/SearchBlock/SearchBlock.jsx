import { useCallback, useEffect, useRef } from 'react'
import {
    Button,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSearchParams } from 'react-router'

import { useStoreContext } from '../../../context/StoreContext'
import { getMoviesBySearch } from '../../../context/requests'
import { MOVIES_EMPTY, MOVIES_SEARCH } from '../../../data/constants'

const SearchBlock = () => {
    const {
        searchInput,
        error,
        movies,
        showingMovies,
        isMoviesLoading,

        setSearchInput,
        setError,
        setMovies,
        setShowingMovies,
        setIsMoviesLoading,
    } = useStoreContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const inputRef = useRef(null)

    const getSearchMovies = useCallback(
        (movieTitle = '') => {
            const searchString = movieTitle || searchInput

            setIsMoviesLoading(true)
            getMoviesBySearch(searchString)
                .then((searchedMovies) => {
                    setMovies({
                        name: 'search',
                        value: {
                            title: searchString,
                            list: searchedMovies,
                        },
                    })
                    setShowingMovies(MOVIES_SEARCH)

                    if (searchedMovies.length) {
                        setError(null)
                    } else {
                        setShowingMovies(MOVIES_EMPTY)
                        setError({
                            error: '0 results',
                            message: `We didn't find any movie with "${searchString}" name \nPlease try to find other movies :)`,
                        })
                    }
                })
                .catch((error) => {
                    setShowingMovies(MOVIES_EMPTY)
                    setError({
                        error: error.message,
                        message: 'Search movies request failed',
                    })
                })
                .finally(() => {
                    setIsMoviesLoading(false)
                })
        },
        [searchInput, setError, setMovies, setIsMoviesLoading, setShowingMovies]
    )

    const handleInputChange = (e) => {
        const input = e.target.value

        setSearchInput(input)
        if (input === '') {
            setSearchParams()
            setMovies({
                name: 'search',
                value: {
                    title: '',
                    list: [],
                },
            })
        }
    }

    useEffect(() => {
        const searchInputFromURL = searchParams.get('search')

        if (!searchInputFromURL) {
            setSearchInput('')
        } else {
            setSearchInput(searchInputFromURL)
            getSearchMovies(searchInputFromURL)
        }
        // eslint-disable-next-line
    }, [searchParams, setSearchInput])

    return (
        <Grid container spacing={2} sx={{ margin: '2rem 0 1rem' }}>
            <Grid size={12}>
                <Typography
                    variant="h4"
                    component="h3"
                    align="center"
                    color="textPrimary"
                >
                    Find your favorite movie 🔍
                </Typography>
            </Grid>
            <Grid size={12}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (searchInput.trim()) {
                            setSearchParams({ search: searchInput.trim() })
                        }
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Search..."
                            color="primary"
                            ref={inputRef}
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="secondary"
                        >
                            FIND
                        </Button>
                    </Stack>
                </form>
            </Grid>
            <Grid size={12}>
                <LinearProgress
                    sx={{
                        opacity: isMoviesLoading ? '1' : '0',
                        transition: 'opacity .5s linear',
                    }}
                />
            </Grid>
            {!isMoviesLoading && !error && (
                <Grid size={12}>
                    <Typography variant="body1" color="textPrimary">
                        {`"${movies[showingMovies].title}" results`}
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default SearchBlock
