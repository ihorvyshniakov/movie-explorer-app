import { Grid2 as Grid, Paper, Skeleton, Stack } from '@mui/material'

const MovieSkeleton = () => {
    return (
        <>
            <Grid
                size={{ sm: 12, md: 5 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: '100%' }}
            >
                <Paper
                    square={true}
                    elevation={0}
                    sx={{
                        overflow: 'hidden',
                        width: 300,
                        height: 500,
                    }}
                >
                    <Skeleton
                        style={{ width: '100%', height: '100%' }}
                        variant="rounded"
                        animation="pulse"
                    />
                </Paper>
            </Grid>
            <Grid
                container
                size={{ sm: 12, md: 7 }}
                spacing={2}
                sx={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(5, min-content)',
                    width: '100%',
                }}
            >
                <Grid>
                    <Skeleton
                        variant="rounded"
                        height="3rem"
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>
                <Grid>
                    <Skeleton variant="rounded" height="5rem" />
                </Grid>
                <Grid container spacing={1} direction="column">
                    <Grid>
                        <Skeleton
                            variant="rounded"
                            height="2rem"
                            sx={{
                                width: 200,
                            }}
                        />
                    </Grid>
                    <Grid>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Skeleton
                                variant="rounded"
                                height="2rem"
                                sx={{
                                    width: 200,
                                }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={1} direction="row" alignItems="center">
                    {[...new Array(2)].map((el, index) => (
                        <Grid key={`skeleton-chip-${index}`}>
                            <Skeleton
                                variant="rounded"
                                height="2rem"
                                sx={{
                                    width: '4rem',
                                    borderRadius: '1rem',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    container
                    spacing={0.5}
                    columns={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: '110px 200px',
                        md: '180px 1fr',
                    }}
                >
                    {[...new Array(8)].map((el, index) => (
                        <Grid key={`skeleton-table-cell-${index}`}>
                            <Skeleton variant="rounded" height="2rem" />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

export default MovieSkeleton
