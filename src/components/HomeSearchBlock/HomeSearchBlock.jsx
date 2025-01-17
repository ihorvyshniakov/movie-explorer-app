import { TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useStoreContext } from '../../store/store'

const HomeSearchBlock = () => {
    const { searchInput, setSearchInput } = useStoreContext()

    const updateSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

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
                    onChange={updateSearchInput}
                />
            </Grid>
        </Grid>
    )
}

export default HomeSearchBlock
