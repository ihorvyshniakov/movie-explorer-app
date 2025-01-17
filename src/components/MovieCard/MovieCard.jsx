import { Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { Link } from 'react-router'

// import MatrixImg from '/matrix.jpg'

const MovieCard = ({
    id,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
}) => {
    return (
        <Link
            to={`/movie/${id}/${title.replaceAll(/[.,:;'"]/g, '').replaceAll(' ', '-')}`}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w300${poster_path}`}
                        alt={`${title} poster`}
                        height="400"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            sx={{ height: '4rem' }}
                        >
                            {title}
                        </Typography>
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
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default MovieCard
