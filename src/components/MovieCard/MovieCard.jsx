import { Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'

// import MatrixImg from '/matrix.jpg'

const MovieCard = ({
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={poster_path}
                    alt="movie title"
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
                        sx={{ color: 'text.secondary', marginBottom: '1rem' }}
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
                            <Stack direction="row" alignItems="center" gap={1}>
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
    )
}

export default MovieCard
