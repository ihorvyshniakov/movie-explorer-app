import { Skeleton, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'

import Link from '../Link/Link'
import Image from '../Image/Image'

const MovieCard = ({
    id,
    title,
    name,
    overview,
    poster_path,
    vote_average,
    release_date,
}) => {
    return (
        <Link
            url={`/movie/${id}/${(title || name).replaceAll(/[.,:;'"]/g, '').replaceAll(' ', '-')}`}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 345, height: '100%' }}>
                <CardActionArea
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Image
                        title={title || name}
                        url={`https://image.tmdb.org/t/p/w300${poster_path}`}
                        preloaderHeight={400}
                    />
                    <CardContent
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateRows: 'auto auto 1fr',
                            flexGrow: 1,
                        }}
                    >
                        {title || name ? (
                            <Typography
                                gutterBottom
                                variant="h5"
                                sx={{ height: '4rem' }}
                                className="ellipsis-2-lines"
                            >
                                {title || name}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="text"
                                animation={false}
                                sx={{ fontSize: '4rem', width: '100%' }}
                            />
                        )}
                        {overview ? (
                            <Typography
                                gutterBottom
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    marginBottom: '1rem',
                                }}
                                className="ellipsis-4-lines"
                            >
                                {overview}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="rounded"
                                height="50px"
                                animation={false}
                                sx={{
                                    marginBottom: '1rem',
                                }}
                            />
                        )}

                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            alignSelf="flex-end"
                        >
                            <Grid>
                                {vote_average > 0 && (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <StarsIcon sx={{ color: 'orange' }} />
                                        <Typography variant="h6" component="p">
                                            {vote_average.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                )}
                            </Grid>
                            <Grid>
                                {release_date && (
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        align="right"
                                    >
                                        {release_date.slice(0, 4)}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default MovieCard
