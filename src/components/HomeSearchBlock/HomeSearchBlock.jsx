import { LinearProgress, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useStoreContext } from '../../store/store'
import { useEffect, useState } from 'react'
import { getMoviesBySearch } from '../../store/https'

const HomeSearchBlock = () => {
    const { searchInput, setSearchInput, setMoviesBasedOnSearch } =
        useStoreContext()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (searchInput.length) {
            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true)
                getMoviesBySearch(searchInput)
                    .then((data) => {
                        setMoviesBasedOnSearch(data)
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
                {isLoading && <LinearProgress />}
            </Grid>
        </Grid>
    )
}

export default HomeSearchBlock
