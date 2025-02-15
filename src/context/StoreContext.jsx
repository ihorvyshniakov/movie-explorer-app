import { createContext, useCallback, useContext, useReducer } from 'react'

import {
    MOVIES_EMPTY,
    MOVIES_SEARCH,
    MOVIES_TOP_RATED,
} from '../data/constants'
import { reducer } from './reducer'

const StoreContext = createContext(null)

export const useStoreContext = () => {
    const contex = useContext(StoreContext)

    return contex
}

const initialState = {
    error: null,
    searchInput: '',
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
        isLoading: false,
    },
}

export const StoreContextProvider = ({ children }) => {
    const [{ error, searchInput, movies, show }, dispatch] = useReducer(
        reducer,
        initialState
    )

    const setError = useCallback((error) => {
        dispatch({ type: 'set_error', payload: error })
    }, [])

    const setSearchInput = useCallback((input) => {
        dispatch({ type: 'set_search_input', payload: input })
    }, [])

    const setShow = useCallback(({ movies, page }) => {
        dispatch({ type: 'set_show', payload: { movies, page } })
    }, [])

    const setMovies = useCallback((moviesListDetails) => {
        dispatch({ type: 'set_movies', payload: moviesListDetails })
    }, [])

    const setIsMoviesLoading = useCallback((isLoading) => {
        dispatch({ type: 'set_is_movies_loading', payload: isLoading })
    }, [])

    const contextValue = {
        error,
        setError,
        searchInput,
        setSearchInput,
        movies,
        setMovies,
        isMoviesLoading: movies.isLoading,
        setIsMoviesLoading,
        show,
        setShow,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
