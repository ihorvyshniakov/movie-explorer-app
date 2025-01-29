import { Link as MaterialLink } from '@mui/material'
import { useNavigate } from 'react-router'
import { useStoreContext } from '../../context/StoreContext'

const Link = ({ url, children, ...props }) => {
    const navigate = useNavigate()
    const { setSearchInput, setSearchMoviesList } = useStoreContext()

    const goToPage = () => {
        if (url === '') {
            setSearchInput('')
        }
        setSearchMoviesList([])
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
