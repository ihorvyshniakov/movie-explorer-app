import { Chip, Skeleton, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function ChipsList({
    list,
    qty,
    componentProps,
    SkeletonProps,
}) {
    return (
        <Grid container spacing={1} direction="row" alignItems="center">
            {list.length ? (
                <Stack {...componentProps}>
                    {list.map(({ id, name }) => (
                        <Chip key={id} label={name} color="secondary" />
                    ))}
                </Stack>
            ) : (
                [...new Array(qty <= 2 ? 2 : qty)].map((el, index) => (
                    <Grid key={`skeleton-chip-${index}`}>
                        <Skeleton
                            animation={false}
                            variant="rounded"
                            {...SkeletonProps}
                        />
                    </Grid>
                ))
            )}
        </Grid>
    )
}
