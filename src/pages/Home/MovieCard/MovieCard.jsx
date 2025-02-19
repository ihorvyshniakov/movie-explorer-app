import { Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid2'
import StarsIcon from '@mui/icons-material/Stars'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'

import './MovieCard.css'
import { Title, Details, ReleaseDate, Image } from '../../../components'
import useHoverTilt from '../../../hooks/useHoverTilt'

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
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } =
        useHoverTilt()

    const openMovieModal = () => {
        navigate(`/movie/${id}`)
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
                            gap: '1rem',
                            bgcolor: 'background.paper',
                            backgroundImage: 'var(--Paper-overlay)',
                        }}
                    >
                        <Title
                            title={title}
                            componentProps={{
                                variant: 'h5',
                                className: 'ellipsis-2-lines',
                                height: '4rem',
                            }}
                            SkeletonProps={{
                                height: '4rem',
                            }}
                        />
                        <Details
                            overview={overview}
                            componentProps={{
                                variant: 'body2',
                                className: 'ellipsis-4-lines',
                                color: 'text.secondary',
                            }}
                            SkeletonProps={{
                                height: '5rem',
                            }}
                        />

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
                                <ReleaseDate
                                    releaseDate={release_date.slice(0, 4)}
                                    componentProps={{
                                        variant: 'h6',
                                        component: 'p',
                                        align: 'right',
                                    }}
                                    SkeletonProps={{
                                        height: '2rem',
                                        width: '4rem',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </MotionCard>
        </Grid>
    )
}

export default MovieCard
