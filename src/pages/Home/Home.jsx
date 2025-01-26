import { useState } from 'react'

import HomeSearchBlock from '../../components/HomeSearchBlock/HomeSearchBlock'
import MovieCardList from '../../components/MovieCardList/MovieCardList'
import MovieModal from '../../components/MovieModal/MovieModal'

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <MovieModal />
            <HomeSearchBlock
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <MovieCardList isLoading={isLoading} setIsLoading={setIsLoading} />
        </>
    )
}

export default Home
