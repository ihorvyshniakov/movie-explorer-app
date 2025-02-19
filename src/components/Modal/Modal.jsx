import { Box, Modal as ModalMUI, Slide } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { motion } from 'motion/react'

import './Modal.css'

const MotionBox = motion.create(Box)

const modalStyle = {
    position: 'absolute',
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
    top: '-10px',
    right: '-10px',
    transform: 'translate(30%, -30%)',
    '&:hover': {
        cursor: 'pointer',
    },
}

const Modal = ({ open, onClose, children }) => {
    return (
        <ModalMUI open={open} onClose={onClose}>
            <Slide
                direction="up"
                in={open}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                <Box
                    sx={{
                        ...modalStyle,
                        marginTop: {
                            sm: '0',
                            md: '-10vh',
                        },
                    }}
                >
                    {children}
                    <MotionBox
                        sx={closeIconStyles}
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.6 }}
                    >
                        <CancelIcon
                            onClick={onClose}
                            fontSize="large"
                            color="secondary"
                        />
                    </MotionBox>
                </Box>
            </Slide>
        </ModalMUI>
    )
}

export default Modal
