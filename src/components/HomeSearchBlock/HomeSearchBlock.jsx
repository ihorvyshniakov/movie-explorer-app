import { useEffect } from 'react'
import { LinearProgress, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { useStoreContext } from '../../store/store'
import { getMoviesBySearch } from '../../store/https'

const HomeSearchBlock = ({ isLoading, setIsLoading }) => {
    const { searchInput, setSearchInput, setSearchMoviesList } =
        useStoreContext()

    useEffect(() => {
        if (searchInput === '') {
            setSearchMoviesList([])
        }
        if (searchInput.length) {
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
                    onChange={(e) => setSearchInput(e.target.value)}
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
