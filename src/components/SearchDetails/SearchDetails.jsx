import { Skeleton, Typography } from '@mui/material'

import { useStoreContext } from '../../context/StoreContext'

export default function SearchDetails() {
    const { movies, show } = useStoreContext()

    if (!show) return null

    if (!movies[show.movies].title.length) {
        return (
            <Skeleton
                variant="rounded"
                height="1.5rem"
                sx={{
                    width: '8rem',
                }}
            />
        )
    }

    return (
        <Typography variant="body1" color="textPrimary">
            {`"${movies[show.movies].title}" movies, page - ${show.page}`}
        </Typography>
    )
}
