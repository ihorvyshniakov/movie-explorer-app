import { Link as MaterialLink } from '@mui/material'
import { motion, useAnimation } from 'motion/react'
import { useNavigate } from 'react-router'

const MotionMaterialLink = motion.create(MaterialLink)

const Link = ({ url, children, ...props }) => {
    const navigate = useNavigate()
    const controls = useAnimation()

    const handleTap = async () => {
        await controls.start({
            // Always begin animation from start
            scale: [1, 0.9, 1.05, 1],
            transition: { duration: 0.6, ease: 'easeInOut' },
        })
    }
    const goToPage = () => {
        navigate(url)
    }

    return (
        <MotionMaterialLink
            onClick={goToPage}
            underline="none"
            color="inherit"
            initial={{ scale: 1 }}
            animate={controls}
            onTap={handleTap}
            whileHover={{ cursor: 'pointer' }}
            {...props}
        >
            {children}
        </MotionMaterialLink>
    )
}

export default Link
