import { Grid2 as Grid, Pagination } from '@mui/material'
import { useParams, useSearchParams } from 'react-router'

import { useStoreContext } from '../../../context/StoreContext'

const GridPagination = () => {
    const { show, totalPages } = useStoreContext()

    const { movieId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const handlePageChange = (event, value) => {
        setSearchParams((prev) => {
            if (value === 1) {
                prev.delete('page')
            } else {
                prev.set('page', value)
            }

            return prev
        })
    }

    return (
        <Grid display="flex" justifyContent="center" marginTop={4}>
            <Pagination
                count={totalPages >= 10 ? 10 : totalPages}
                page={show?.page || 1}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="large"
                hidePrevButton={true}
                hideNextButton={true}
            />
        </Grid>
    )
}

export default GridPagination
