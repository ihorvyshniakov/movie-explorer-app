import { useCallback, useState } from 'react'

import { getMovieDetailsById } from '../context/requests'

export default function useFetchMovieById() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchMovieById = useCallback((movieId) => {
        setIsLoading(true)
        getMovieDetailsById(movieId)
            .then((data) => {
                setData(data)
                setError(null)
            })
            .catch((error) => {
                setError({
                    error: error.message,
                    message:
                        'Whoops, movie details request failed or \nDatabase do not have an extra info 🤷‍♂️',
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return { data, error, isLoading, fetchMovieById }
}
