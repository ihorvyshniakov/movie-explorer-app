import {
    Card,
    CardActionArea,
    CardContent,
    Paper,
    Skeleton,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

const MovieCardSkeleton = ({ isLoading }) => {
    if (!isLoading) {
        return null
    }

    return [...new Array(6)].map((el, index) => (
        <Card
            key={`skeleton-${index}`}
            sx={{ width: '100%', maxWidth: 345, height: '100%' }}
        >
            <CardActionArea
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Paper
                    square={true}
                    elevation={0}
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                        height: '400px',
                    }}
                >
                    <Skeleton
                        style={{ width: '100%', height: '100%' }}
                        variant="rectangular"
                        animation="pulse"
                    />
                </Paper>
                <CardContent
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateRows: 'auto auto 1fr',
                        flexGrow: 1,
                    }}
                >
                    <Skeleton
                        variant="rounded"
                        height="4rem"
                        sx={{
                            width: '100%',
                            fontSize: '1.5rem',
                            marginBottom: '0.35em',
                        }}
                    />
                    <Skeleton
                        variant="rounded"
                        height="80px"
                        sx={{
                            marginBottom: '1rem',
                        }}
                    />

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        alignSelf="flex-end"
                    >
                        <Grid>
                            <Skeleton
                                variant="rounded"
                                height="2rem"
                                sx={{
                                    width: '6rem',
                                }}
                            />
                        </Grid>
                        <Grid>
                            <Skeleton
                                variant="rounded"
                                height="2rem"
                                sx={{
                                    width: '6rem',
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    ))
}

export default MovieCardSkeleton
