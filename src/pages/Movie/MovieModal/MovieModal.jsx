import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'

import Movie from '../Movie'
import { Modal } from '../../../components'

const MovieModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()
    const { movieId } = useParams()

    const goHome = () => {
        setIsModalOpen(false)
        navigate(-1)
    }

    useEffect(() => {
        if (movieId) {
            setIsModalOpen(true)
        } else {
            setIsModalOpen(false)
        }
    }, [movieId])

    return (
        <Modal open={isModalOpen} onClose={goHome}>
            <Movie movieId={movieId} />
        </Modal>
    )
}

export default MovieModal
