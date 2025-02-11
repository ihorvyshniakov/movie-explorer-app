import { Box, Modal as ModalMUI } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

const modalStyle = {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90vw',
    maxWidth: '900px',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: '1rem',
    '&:focus-visible': {
        outline: 'none',
    },
}

const closeIconStyles = {
    display: 'flex',
    bgcolor: 'background.paper',
    borderRadius: '50%',
    position: 'absolute',
    top: '0rem',
    right: '0rem',
    transform: 'translate(30%, -30%)',
    '&:hover': {
        cursor: 'pointer',
    },
}

const Modal = ({ open, onClose, children }) => {
    return (
        <ModalMUI open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                {children}
                <Box sx={closeIconStyles}>
                    <CancelIcon
                        onClick={onClose}
                        fontSize="large"
                        color="secondary"
                    />
                </Box>
            </Box>
        </ModalMUI>
    )
}

export default Modal
