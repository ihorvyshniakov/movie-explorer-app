import { Skeleton, Typography } from '@mui/material'

export default function ReleaseDate({
    releaseDate,
    componentProps,
    SkeletonProps,
}) {
    if (!releaseDate) {
        return (
            <Skeleton variant="rounded" animation={false} {...SkeletonProps} />
        )
    }

    return <Typography {...componentProps}>{releaseDate}</Typography>
}
