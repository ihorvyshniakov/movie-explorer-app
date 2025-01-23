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

import { useStoreContext } from '../../store/store'
import { getMoviesBySearch } from '../../store/https'

const HomeSearchBlock = ({ isLoading, setIsLoading }) => {
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
                    setIsLoading(false)
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
                    setIsLoading(false)
                    setError({
                        error: error.message,
                        message: 'Search movies request failed',
                    })
                })
        },
        [searchInput]
    )

    useEffect(
        function handlePageOnLoad() {
            const searchInputFromURL = searchParams.get('search')

            if (!searchInputFromURL) {
                setSearchInput('')
            } else {
                setSearchInput(searchInputFromURL)
            }
        },
        [searchParams, setSearchInput]
    )

    useEffect(
        function handleInputChange() {
            if (searchInput === '') {
                setSearchParams()
                setSearchMoviesList([])
            } else {
                setSearchParams({ search: searchInput })
            }
        },
        [searchInput]
    )

    useEffect(() => {
        const searchInputFromURL = searchParams.get('search')

        if (searchInputFromURL?.length) {
            setIsLoading(true)
            getSearchMovies(searchInputFromURL)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container spacing={2} sx={{ margin: '1rem 0' }}>
            <Grid size={12}>
                <Typography variant="h3" component="h3" align="center">
                    Search your favorite movie!
                </Typography>
            </Grid>
            <Grid size={12}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        getSearchMovies()
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Search..."
                            id="search"
                            ref={inputRef}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="contained" type="submit">
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

export default HomeSearchBlock
