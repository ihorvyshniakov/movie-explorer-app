import { Skeleton, Typography } from '@mui/material'

export default function Title({ title, titleProps, SkeletonProps }) {
    if (!title) {
        return <Skeleton variant="text" animation={false} {...SkeletonProps} />
    }

    return <Typography {...titleProps}>{title}</Typography>
}
