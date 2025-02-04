import { Box, Modal as ModalMUI } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
            <Box sx={style}>movie content - {movieId}</Box>
        </ModalMUI>
    )
}

export default MovieModal
