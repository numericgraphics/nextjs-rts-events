import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import KenBurnImage from '../ui/background/KenBurnsImage'

const useStyles = makeStyles({
    slide: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        transition: '.6s ease'
    },
    slideActive: {
        opacity: 1,
        transitionDuration: '.5s'
    }
})

export default function SlideShow (props) {
    const classes = useStyles()
    const { slides, activeSlide, promoInModal } = props
    console.log(!promoInModal)
    return (
        <Box
            className={!promoInModal && 'backgroundSlideShow'}
            // style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}
        >
            {slides.map((slide, index) => {
                return <Box
                    key={index}
                    className={index === activeSlide ? [classes.slide, classes.slideActive].join(' ') : classes.slide}
                >
                    <KenBurnImage
                        className='background'
                        animated={true}
                        imageURL={slide.backgroundImageURL}
                    >
                        <Box
                            style={{
                                background: 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%)',
                                position: 'absolute',
                                top: 0,
                                height: '100%',
                                width: '100%'
                            }} />
                    </KenBurnImage>
                </Box>
            })}
        </Box>
    )
}
