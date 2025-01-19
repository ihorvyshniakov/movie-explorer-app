import { useState } from 'react'
import HomeSearchBlock from '../../components/HomeSearchBlock/HomeSearchBlock'
import MovieCardList from '../../components/MovieCardList/MovieCardList'

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <HomeSearchBlock
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <MovieCardList setIsLoading={setIsLoading} />
        </>
    )
}

export default Home
