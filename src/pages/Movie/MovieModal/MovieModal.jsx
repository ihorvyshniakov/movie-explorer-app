import { Box, Modal as ModalMUI } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Movie from '../Movie'

const style = {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90vw',
    maxWidth: '800px',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: '1rem',
    '&:focus-visible': {
        outline: 'none',
    },
}

const MovieModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true)

    const navigate = useNavigate()
    const { movieId } = useParams()

    useEffect(() => {
        if (movieId) {
            setIsModalOpen(true)
        } else {
            setIsModalOpen(false)
        }
    }, [movieId])

    return (
        <ModalMUI open={isModalOpen} onClose={() => navigate('/')}>
            <Box sx={style}>{movieId && <Movie movieId={movieId} />}</Box>
        </ModalMUI>
    )
}

export default MovieModal
