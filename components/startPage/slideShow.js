import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    contentSwipeableView: {
        position: 'relative'
    },
    backgroundSwipeableView: {
        width: '100%',
        zIndex: -3
    },
    slide: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        transition: '.3s ease'
    },
    slideActive: {
        opacity: 1,
        transitionDuration: '.2s'
    }
})

export default function SlideShow (props) {
    const classes = useStyles()
    const { slides, activeSlide } = props

    useEffect(() => {
        console.log('slide', slides)
    }, [])

    return (
        <Box className={classes.contentSwipeableView} style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}>
            {slides.map((slide, index) => {
                return <Box key={index} className={index === activeSlide ? [classes.slide, classes.slideActive].join(' ') : classes.slide}
                    style={{
                        width: '100%',
                        height: '100vh',
                        zIndex: -3,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%), url(${slide.backgroundImageURL})`
                    }} />
            })}
        </Box>
    )
}
