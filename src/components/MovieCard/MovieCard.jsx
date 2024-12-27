import { Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'

import MatrixImg from '/matrix.jpg'

const MovieCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={MatrixImg}
                    alt="movie title"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        Matrix
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, totam!
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
                                    8.2
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid>
                            <Typography
                                variant="h6"
                                component="p"
                                align="right"
                            >
                                2003
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MovieCard
