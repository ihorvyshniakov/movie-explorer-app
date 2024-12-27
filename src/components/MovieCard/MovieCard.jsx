import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'

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
                    <Typography gutterBottom variant="h5" component="div">
                        Matrix
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis, totam!
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MovieCard
