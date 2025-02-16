import { Skeleton, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useNavigate } from 'react-router'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

import './MovieCard.css'
import Image from '../../../components/Image/Image'
import Title from '../../../components/Title'

const MotionCard = motion.create(Card)

const MovieCard = ({
    id,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
}) => {
    const navigate = useNavigate()

    const openMovieModal = () => {
        navigate(`/movie/${id}`)
    }

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

    return (
        <Grid
            size={4}
            id={id}
            display="flex"
            justifyContent="center"
            sx={{
                width: '100%',
                perspective: 180,
            }}
        >
            <MotionCard
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={openMovieModal}
                className="hover-border"
                sx={{
                    width: '100%',
                    maxWidth: 320,
                    height: '100%',
                    '&::before': {
                        bgcolor: 'hoverBorder.border',
                    },
                    '&::after': {
                        bgcolor: 'hoverBorder.line',
                    },
                }}
                style={{
                    rotateX,
                    rotateY,
                }}
            >
                <CardActionArea
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 2,
                    }}
                >
                    <Image
                        title={title}
                        url={`https://image.tmdb.org/t/p/w300${poster_path}`}
                        preloaderHeight={400}
                    />
                    <CardContent
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateRows: 'auto auto 1fr',
                            flexGrow: 1,
                            bgcolor: 'background.paper',
                            backgroundImage: 'var(--Paper-overlay)',
                        }}
                    >
                        <Title
                            title={title}
                            titleProps={{
                                variant: 'h5',
                                className: 'ellipsis-2-lines',
                                gutterBottom: true,
                                height: '4rem',
                            }}
                            SkeletonProps={{
                                sx: { fontSize: '4rem' },
                            }}
                        />
                        {overview ? (
                            <Typography
                                gutterBottom
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    marginBottom: '1rem',
                                }}
                                className="ellipsis-4-lines"
                            >
                                {overview}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant="rounded"
                                height="80px"
                                animation={false}
                                sx={{
                                    marginBottom: '1rem',
                                }}
                            />
                        )}

                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            alignSelf="flex-end"
                        >
                            <Grid>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <StarsIcon color="info" />
                                    <Typography variant="h6" component="p">
                                        {vote_average.toFixed(2)}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid>
                                {release_date ? (
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        align="right"
                                    >
                                        {release_date.slice(0, 4)}
                                    </Typography>
                                ) : (
                                    <Skeleton
                                        animation={false}
                                        variant="rounded"
                                        height="2rem"
                                        width="4rem"
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </MotionCard>
        </Grid>
    )
}

export default MovieCard
