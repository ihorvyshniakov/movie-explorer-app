import { createContext, useCallback, useContext, useReducer } from 'react'

import {
    MOVIES_EMPTY,
    MOVIES_SEARCH,
    MOVIES_TOP_RATED,
} from '../data/constants'

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
            list: [],
        },
        [MOVIES_SEARCH]: {
            title: '',
            list: [],
        },
        [MOVIES_TOP_RATED]: {
            title: '',
            list: [],
        },
        isLoading: false,
    },
}

function reducer(state, action) {
    switch (action.type) {
        case 'set_error':
            return {
                ...state,
                error: action.payload,
            }

        case 'set_search_input':
            return {
                ...state,
                searchInput: action.payload,
            }

        case 'set_showing_movies':
            return {
                ...state,
                showingMovies: action.payload,
            }

        case 'set_movies':
            return {
                ...state,
                movies: {
                    ...state.movies,
                    [action.payload.name]: action.payload.value,
                },
            }

        default:
            return state
    }
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

    const setShowingMovies = useCallback((value) => {
        dispatch({ type: 'set_showing_movies', payload: value })
    }, [])

    const setMovies = useCallback((moviesListDetails) => {
        dispatch({ type: 'set_movies', payload: moviesListDetails })
    }, [])

    const contextValue = {
        error,
        setError,
        searchInput,
        setSearchInput,
        movies,
        setMovies,
        showingMovies,
        setShowingMovies,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
