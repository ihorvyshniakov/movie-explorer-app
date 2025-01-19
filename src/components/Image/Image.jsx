import { CardMedia, Skeleton } from '@mui/material'
import { useState } from 'react'

const Image = ({ title, url, ...props }) => {
    const [error, setError] = useState(false)

    if (!url || error) {
        return (
            <Skeleton
                sx={{ minWidth: 300 }}
                variant="rectangular"
                height="100%"
                animation={false}
            />
        )
    }

    return (
        <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w300${url}`}
            alt={`${title} poster`}
            onError={() => setError(true)}
            {...props}
        />
    )
}

export default Image
