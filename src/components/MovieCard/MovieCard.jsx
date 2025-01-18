import { Skeleton, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useNavigate } from 'react-router'

const MovieCard = ({
    id,
    title,
    name,
    overview,
    poster_path,
    vote_average,
    release_date,
}) => {
    const navigate = useNavigate()

    const openMoviePage = () => {
        navigate(
            `/movie/${id}/${(title || name).replaceAll(/[.,:;'"]/g, '').replaceAll(' ', '-')}`
        )
    }

    return (
        <Card sx={{ maxWidth: 345 }} onClick={openMoviePage}>
            <CardActionArea>
                {poster_path ? (
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w300${poster_path}`}
                        alt={`${title || name} poster`}
                        height="400"
                    />
                ) : (
                    <Skeleton
                        sx={{ minWidth: 300 }}
                        variant="rectangular"
                        height={400}
                        animation={false}
                    />
                )}
                <CardContent>
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
                        />
                    )}
                    {vote_average && release_date && (
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid>
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
                            </Grid>
                            <Grid>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    align="right"
                                >
                                    {release_date.slice(0, 4)}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MovieCard
