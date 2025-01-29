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

const SearchBlock = ({ isLoading, setIsLoading }) => {
    const { setError, searchInput, setSearchInput, setSearchMoviesList } =
        useStoreContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const inputRef = useRef(null)

    const getSearchMovies = useCallback(
        (movieTitle = '') => {
            const searchString = movieTitle || searchInput

            setIsLoading(true)
            getMoviesBySearch(searchString)
                .then((data) => {
                    setSearchMoviesList(data)
                    if (data.length) {
                        setError(null)
                    } else {
                        setError({
                            error: '0 results',
                            message: `We didn't find any movie with "${searchString}" name \nPlease try to find other movies :)`,
                        })
                    }
                })
                .catch((error) => {
                    setError({
                        error: error.message,
                        message: 'Search movies request failed',
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        },
        [searchInput, setError, setSearchMoviesList, setIsLoading]
    )

    const handleInputChange = (e) => {
        const input = e.target.value

        setSearchInput(input)
        if (input === '') {
            setSearchParams()
            setSearchMoviesList([])
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
                <Typography variant="h4" component="h3" align="center">
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
                            id="search"
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
                        opacity: isLoading ? '1' : '0',
                        transition: 'opacity .5s linear',
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SearchBlock
