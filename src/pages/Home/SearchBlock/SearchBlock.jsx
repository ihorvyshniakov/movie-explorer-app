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
        (movieTitle, pageNumber) => {
            const searchString = movieTitle || searchInput

            setIsMoviesLoading(true)
            getMoviesBySearch(searchString, pageNumber)
                .then((details) => {
                    setMovies({
                        name: 'search',
                        value: {
                            title: searchString,
                            details,
                        },
                    })
                    setShowingMovies(MOVIES_SEARCH)

                    if (details.results.length) {
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
                    details: {
                        results: [],
                    },
                },
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (searchInput.trim()) {
            setSearchParams({ search: searchInput.trim() })
        }
        setSearchInput('')
        const inputEl = inputRef.current.querySelector('input')
        inputEl.blur()
    }

    useEffect(() => {
        const searchInputFromURL = searchParams.get('search')
        const startingPage = Number(searchParams.get('page')) || 1

        if (searchInputFromURL) {
            getSearchMovies(searchInputFromURL, startingPage)
        }
        // eslint-disable-next-line
    }, [searchParams, setSearchInput])

    return (
        <Grid container spacing={2} sx={{ margin: '2rem 0 1rem' }}>
            <Grid size={12}>
                <Typography
                    component="h3"
                    align="center"
                    color="textPrimary"
                    sx={{
                        typography: {
                            xs: 'h5',
                            md: 'h4',
                        },
                    }}
                >
                    Find your favorite movie 🔍
                </Typography>
            </Grid>
            <Grid size={12}>
                <form onSubmit={handleSubmit}>
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
                    color="secondary"
                    sx={{
                        opacity: isMoviesLoading ? '1' : '0',
                        transition: 'opacity .5s linear',
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SearchBlock
