import { CardMedia, Paper, Skeleton } from '@mui/material'
import HideImageIcon from '@mui/icons-material/HideImage'
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
    const [imageError, setImageError] = useState(false)

    return (
        <Paper
            square={square}
            elevation={elevation}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: preloaderHeight,
            }}
        >
            {!isLoaded && (
                <Skeleton
                    style={{ width: '100%', height: '100%' }}
                    variant="rectangular"
                    animation={imageError ? false : 'pulse'}
                />
            )}
            {!imageError ? (
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w300${url}`}
                    alt={`${title} poster`}
                    onError={() => setImageError(true)}
                    onLoad={() => setIsLoaded(true)}
                    sx={{
                        width: '100%',
                        height: '100%',
                        opacity: isLoaded ? '1' : '0',
                        transition: 'opacity .5s linear',
                        position: 'relative',
                    }}
                    {...props}
                />
            ) : (
                <HideImageIcon
                    fontSize="large"
                    sx={{
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
        </Paper>
    )
}

export default Image
