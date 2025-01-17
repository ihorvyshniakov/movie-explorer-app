import { useEffect, useState } from 'react'

import { useStoreContext } from '../../store/store'
import { getTopRatedMovies } from '../../store/https'
import HomeSearchBlock from '../../components/HomeSearchBlock/HomeSearchBlock'
import MovieCardList from '../../components/MovieCardList/MovieCardList'

const Home = () => {
    const { topRatedMoviesList, setTopRatedMoviesList } = useStoreContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (topRatedMoviesList.length === 0) {
            setIsLoading(true)

            getTopRatedMovies()
                .then((moviesList) => {
                    setTopRatedMoviesList(moviesList)
                    setIsLoading(false)
                    setError(null)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                })
        }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <HomeSearchBlock />

            <MovieCardList
                moviesList={topRatedMoviesList}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default Home
