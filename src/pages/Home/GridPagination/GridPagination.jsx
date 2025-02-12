import { Grid2 as Grid, Pagination } from '@mui/material'
import { useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useStoreContext } from '../../../context/StoreContext'

const GridPagination = () => {
    const [page, setPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const { movies, showingMovies } = useStoreContext()

    const { movieId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const maxPages = movies[showingMovies].details.total_pages
        if (!maxPages) return

        if (maxPages !== totalPages) {
            setTotalPages(maxPages >= 10 ? 10 : maxPages)
        }
    }, [movies])

    useEffect(() => {
        const startingPage = Number(searchParams.get('page')) || 1

        if (startingPage) {
            setPage(startingPage)
        }
    }, [searchParams])

    useEffect(() => {
        if (!movieId && page) {
            setSearchParams((prev) => {
                prev.set('page', page)
                return prev
            })
        }
    }, [page])

    return (
        <Grid display="flex" justifyContent="center">
            <Pagination
                count={totalPages || 1}
                page={page || 1}
                onChange={(event, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
            />
        </Grid>
    )
}

export default GridPagination
