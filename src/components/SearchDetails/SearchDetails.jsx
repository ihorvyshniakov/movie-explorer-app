import { useStoreContext } from '../../context/StoreContext'
import { ChipsList } from '../_WithSkeleton'

export default function SearchDetails() {
    const { movies, show } = useStoreContext()

    let list
    if (!show || !movies[show.movies].title.length || movies.isLoading) {
        list = []
    } else {
        list = [
            { id: 1, name: `Page ${show.page}` },
            { id: 2, name: movies[show.movies].title },
        ]
    }

    return (
        <>
            <ChipsList
                list={list}
                componentProps={{
                    direction: 'row',
                    sx: { flexWrap: 'wrap', gap: '0.5rem' },
                }}
                SkeletonProps={{
                    height: '2rem',
                    width: '4rem',
                    sx: {
                        borderRadius: '1rem',
                    },
                }}
            />
        </>
    )
}
