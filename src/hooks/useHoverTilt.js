import { useMotionValue, useSpring, useTransform } from 'motion/react'

export default function useHoverTilt() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['1deg', '-1deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg'])

    const handleMouseMove = (e) => {
        let rect = e.currentTarget.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseOnElementX = e.clientX - rect.left
        const mouseOnElementY = e.clientY - rect.top

        const xPercent = mouseOnElementX / width - 0.5
        const yPercent = mouseOnElementY / height - 0.5

        x.set(xPercent)
        y.set(yPercent)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}
