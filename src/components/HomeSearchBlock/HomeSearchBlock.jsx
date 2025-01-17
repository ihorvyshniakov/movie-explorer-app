import { TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

const HomeSearchBlock = () => {
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
                />
            </Grid>
        </Grid>
    )
}

export default HomeSearchBlock
