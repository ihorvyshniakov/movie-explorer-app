import { useEffect } from 'react'
import { LinearProgress, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSearchParams } from 'react-router'

import { useStoreContext } from '../../store/store'
import { getMoviesBySearch } from '../../store/https'

const HomeSearchBlock = ({ isLoading, setIsLoading }) => {
    const { searchInput, setSearchInput, setSearchMoviesList } =
        useStoreContext()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // return to Home
        const searchInputFromURL = searchParams.get('search')

        if (!searchInputFromURL) {
            setSearchInput('')
        }
    }, [searchParams, setSearchInput])

    useEffect(() => {
        if (searchInput === '') {
            setSearchParams()
            setSearchMoviesList([])
        } else {
            setSearchParams({ search: searchInput })

            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true)
                getMoviesBySearch(searchInput)
                    .then((data) => {
                        setSearchMoviesList(data)
                        clearTimeout(delayDebounceFn)
                        setIsLoading(false)
                    })
                    .catch(() => {
                        clearTimeout(delayDebounceFn)
                        setIsLoading(false)
                    })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
        // eslint-disable-next-line
    }, [searchInput])

    return (
        <Grid container spacing={2} sx={{ margin: '1rem 0' }}>
            <Grid size={12}>
                <Typography variant="h3" component="h3" align="center">
                    Search your favorite movie!
                </Typography>
                <TextField
                    fullWidth
                    label="Search..."
                    id="search"
                    margin="normal"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
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
