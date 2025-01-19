import { CardMedia, Paper, Skeleton } from '@mui/material'
import { useState } from 'react'

const Image = ({
    title = '',
    url = '',
    preloaderHeight = 300,
    elevation = 0,
    square = true,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    return (
        <Paper
            square={square}
            elevation={elevation}
            sx={{
                overflow: 'hidden',
                width: '100%',
                height: preloaderHeight,
            }}
        >
            {!isLoaded && (
                <Skeleton
                    style={{ width: '100%', height: '100%' }}
                    variant="rectangular"
                    animation={error ? false : 'pulse'}
                />
            )}
            {!error && (
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w300${url}`}
                    alt={`${title} poster`}
                    onError={() => setError(true)}
                    onLoad={() => setIsLoaded(true)}
                    sx={{
                        width: '100%',
                        height: '100%',
                        opacity: isLoaded ? '1' : '0',
                        transition: 'opacity .5s linear',
                    }}
                    {...props}
                />
            )}
        </Paper>
    )
}

export default Image
