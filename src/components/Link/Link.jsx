import { Link as MaterialLink } from '@mui/material'
import { useNavigate } from 'react-router'
import { useStoreContext } from '../../context/StoreContext'

const Link = ({ url, children, ...props }) => {
    const navigate = useNavigate()
    const { setSearchInput, setMovies } = useStoreContext()

    const goToPage = () => {
        if (url === '') {
            setSearchInput('')
        }
        setMovies({
            name: 'search',
            value: {
                title: '',
                details: {
                    results: [],
                },
            },
        })
        navigate(url)
    }

    return (
        <MaterialLink
            onClick={goToPage}
            underline="none"
            color="inherit"
            sx={{
                ...props.sx,
                '&:hover': {
                    cursor: 'pointer',
                },
            }}
        >
            {children}
        </MaterialLink>
    )
}

export default Link
