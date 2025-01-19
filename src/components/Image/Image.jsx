import { CardMedia, Skeleton } from '@mui/material'
import { useState } from 'react'

const Image = ({ title, url, ...props }) => {
    const [error, setError] = useState(false)

    if (!url || error) {
        return (
            <Skeleton
                style={{ width: '100%', height: '100%' }}
                variant="rectangular"
                animation={false}
                {...props}
            />
        )
    }

    return (
        <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w300${url}`}
            alt={`${title} poster`}
            onError={() => setError(true)}
            style={{ width: '100%', height: '100%' }}
            {...props}
        />
    )
}

export default Image
