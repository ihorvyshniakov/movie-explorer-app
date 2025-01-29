import { Box, Modal as ModalMUI } from '@mui/material'
import { useStoreContext } from '../../../context/StoreContext'

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
    const {
        modal: { isOpen, movieId },
        setModal,
    } = useStoreContext()

    return (
        <ModalMUI open={isOpen} onClose={() => setModal()}>
            <Box sx={style}>movie content - {movieId}</Box>
        </ModalMUI>
    )
}

export default MovieModal
