import { CardMedia, Skeleton } from '@mui/material'
import { useState } from 'react'

const Image = ({ title, url = '', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    if (error) {
        return (
            <Skeleton
                style={{ width: '100%', height: '100%' }}
                variant="rectangular"
                animation={false}
            />
        )
    }

    return (
        <>
            {!isLoaded && (
                <Skeleton
                    style={{ width: '100%', height: '100%' }}
                    variant="rectangular"
                />
            )}
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
        </>
    )
}

export default Image
