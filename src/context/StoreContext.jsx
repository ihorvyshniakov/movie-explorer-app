import { createContext, useCallback, useContext, useReducer } from 'react'

import {
    MOVIES_EMPTY,
    MOVIES_SEARCH,
    MOVIES_TOP_RATED,
} from '../data/constants'
import { reducer } from './StoreReducer'

const StoreContext = createContext(null)

export const useStoreContext = () => {
    const contex = useContext(StoreContext)

    return contex
}

const initialState = {
    totalPages: 1,
    show: null,
    movies: {
        [MOVIES_EMPTY]: {
            title: '',
            details: {
                results: [],
            },
        },
        [MOVIES_SEARCH]: {
            title: '',
            details: {
                results: [],
            },
        },
        [MOVIES_TOP_RATED]: {
            title: '',
            details: {
                results: [],
            },
        },
        error: null,
        isLoading: false,
    },
}

export const StoreContextProvider = ({ children }) => {
    const [{ movies, show, totalPages }, dispatch] = useReducer(
        reducer,
        initialState
    )

    const setShow = useCallback(({ movies, page }) => {
        dispatch({ type: 'set_show', payload: { movies, page } })
    }, [])

    const setTotalPages = useCallback((payload) => {
        dispatch({ type: 'set_total_pages', payload })
    }, [])

    const setMovies = useCallback((moviesListDetails) => {
        dispatch({ type: 'set_movies', payload: moviesListDetails })
    }, [])

    const setError = useCallback((error) => {
        dispatch({ type: 'set_error', payload: error })
    }, [])

    const setIsMoviesLoading = useCallback((isLoading) => {
        dispatch({ type: 'set_is_movies_loading', payload: isLoading })
    }, [])

    const contextValue = {
        totalPages,
        setTotalPages,

        show,
        setShow,

        movies,
        setMovies,
        error: movies.error,
        setError,
        isMoviesLoading: movies.isLoading,
        setIsMoviesLoading,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
