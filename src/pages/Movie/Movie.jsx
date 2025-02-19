import { Box, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useEffect } from 'react'

import {
    Title,
    Details,
    ReleaseDate,
    Image,
    Error,
    TwoColumnTable,
    ChipsList,
} from '../../components'
import MovieSkeleton from './MovieSkeleton'
import useFetchMovieById from '../../hooks/useFetchMovieById'
import { formatDate, generateArrayForTable } from '../../utils'

const Movie = ({ movieId }) => {
    const { data, error, isLoading, fetchMovieById } = useFetchMovieById()

    useEffect(() => {
        if (movieId) {
            fetchMovieById(movieId)
        }
    }, [movieId, fetchMovieById])

    if (error) {
        return <Error {...error} />
    }

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 6, md: 12 }}
                sx={{
                    padding: '.5rem .5rem 1rem',
                    overflow: 'auto',
                    maxHeight: 'calc(80vh - 2rem)',
                }}
            >
                {isLoading && <MovieSkeleton />}
                {data && (
                    <>
                        <Grid
                            size={{ sm: 12, md: 5 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%' }}
                        >
                            <Box sx={{ minWidth: 300 }}>
                                <Image
                                    title={data.title}
                                    url={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                                    preloaderHeight={500}
                                    elevation={3}
                                    square={false}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            container
                            size={{ sm: 12, md: 7 }}
                            spacing={2}
                            sx={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateRows: 'repeat(5, min-content)',
                            }}
                        >
                            <Grid>
                                <Title
                                    title={data.title}
                                    componentProps={{
                                        component: 'h1',
                                        color: 'textPrimary',
                                        sx: {
                                            margin: 0,
                                            typography: {
                                                xs: 'h5',
                                                md: 'h4',
                                            },
                                        },
                                    }}
                                    SkeletonProps={{
                                        sx: { height: '3rem', width: 250 },
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Details
                                    overview={data.overview}
                                    componentProps={{
                                        variant: 'body2',
                                        color: 'textPrimary',
                                    }}
                                    SkeletonProps={{
                                        height: '5rem',
                                    }}
                                />
                            </Grid>
                            <Grid container spacing={1} direction="column">
                                <Grid>
                                    <ReleaseDate
                                        releaseDate={
                                            data.release_date
                                                ? `Release - ${formatDate(data.release_date)}`
                                                : null
                                        }
                                        componentProps={{
                                            variant: 'h6',
                                            component: 'p',
                                            color: 'textPrimary',
                                        }}
                                        SkeletonProps={{
                                            height: '2rem',
                                            width: '4rem',
                                        }}
                                    />
                                </Grid>
                                <Grid>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <StarsIcon color="info" />
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            color="textPrimary"
                                        >
                                            {data.vote_average.toFixed(2)}
                                            {` (${data.vote_count} votes)`}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <ChipsList
                                list={data.genres}
                                componentProps={{
                                    direction: 'row',
                                    sx: { flexWrap: 'wrap', gap: '0.5rem' },
                                }}
                                SkeletonProps={{
                                    height: '2rem',
                                    width: '4rem',
                                    sx: {
                                        borderRadius: '1rem',
                                    },
                                }}
                            />
                            <Grid display="flex" justifyContent="center">
                                <TwoColumnTable
                                    rows={generateArrayForTable(data)}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    )
}

export default Movie
