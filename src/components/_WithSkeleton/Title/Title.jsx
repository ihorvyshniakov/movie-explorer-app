import { Skeleton, Typography } from '@mui/material'

export default function Title({ title, componentProps, SkeletonProps }) {
    if (!title) {
        return (
            <Skeleton variant="rounded" animation={false} {...SkeletonProps} />
        )
    }

    return <Typography {...componentProps}>{title}</Typography>
}
