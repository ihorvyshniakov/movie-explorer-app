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
    showingMovies: MOVIES_EMPTY,
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
    const [{ error, searchInput, movies, showingMovies }, dispatch] =
        useReducer(reducer, initialState)

    const setError = useCallback((error) => {
        dispatch({ type: 'set_error', payload: error })
    }, [])

    const setSearchInput = useCallback((input) => {
        dispatch({ type: 'set_search_input', payload: input })
    }, [])

    const setShowingMovies = useCallback((payload) => {
        dispatch({ type: 'set_showing_movies', payload })
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
        showingMovies,
        setShowingMovies,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
