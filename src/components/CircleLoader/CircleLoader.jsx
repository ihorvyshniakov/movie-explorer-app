import { CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2'

const CircleLoader = ({ isLoading }) => {
    if (!isLoading) {
        return null
    }

    return (
        <Grid
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '300px' }}
        >
            <CircularProgress size="5rem" />
        </Grid>
    )
}

export default CircleLoader
