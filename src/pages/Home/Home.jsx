import { useState } from 'react'

import MoviesGrid from './MoviesGrid/MoviesGrid'
import SearchBlock from './SearchBlock/SearchBlock'
import MovieModal from './MovieModal/MovieModal'

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <MovieModal />
            <SearchBlock isLoading={isLoading} setIsLoading={setIsLoading} />
            <MoviesGrid isLoading={isLoading} setIsLoading={setIsLoading} />
        </>
    )
}

export default Home
