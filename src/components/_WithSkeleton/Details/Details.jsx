import { Skeleton, Typography } from '@mui/material'

export default function Details({ overview, componentProps, SkeletonProps }) {
    if (!overview) {
        return (
            <Skeleton variant="rounded" animation={false} {...SkeletonProps} />
        )
    }

    return <Typography {...componentProps}>{overview}</Typography>
}
