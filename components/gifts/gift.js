import React, { useEffect, useState, useRef, createRef, forwardRef } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../../styles/jsx/gifts/gift.style'
import { useHeight } from '../../hooks/useHeight'
import IconButton from '@material-ui/core/IconButton'
import { lockIcon, playIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import VideoPlayerFloat from '../ui/video/VideoPlayerFloat'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import useTheme from '@material-ui/core/styles/useTheme'

export const ModalStates = Object.freeze({
    GIFT: 'gift',
    GIFT_VIDEO: 'giftVideo'
})

function Gift (props, ref) {
    const { open, handleClose, gift } = props
    const { videoURL, imageURL, locked, title, message, backgroundVideoURL } = gift
    const classes = useStyles()
    const height = useHeight()
    const theme = useTheme()
    const [onTransition, setTransition] = useState(undefined)
    const [videoVisible, setVideoVisible] = useState(false)
    const boxTextRef = useRef()
    const lockIconRef = createRef()
    const videoRef = useRef()
    const flashGift = useRef()

    useEffect(() => {
        console.log(flashGift)
    }, [flashGift.current])

    console.log(backgroundVideoURL)

    useEffect(() => {
        setTransition(open)
    }, [])

    useEffect(() => {
        if (open) {
            videoRef.current && videoRef.current.play()
        }
    }, [open])

    function onExited () {
        handleClose()
    }

    function transitionClose () {
        setTransition(false)
    }

    function playVideo (value) {
        setVideoVisible(value)
    }

    return (
        <React.Fragment>
            <Slide
                direction="up"
                in={onTransition}
                timeout={{
                    appear: 1000,
                    enter: 1000,
                    exit: 200
                }}
                mountOnEnter
                unmountOnExit
                onExited={onExited}
            >
                <Box
                    ref={ref}
                    className={classes.modalContent}
                    tabIndex={'-1'}
                >
                    <ButtonCloseModal
                        handleClose={transitionClose}
                        className={classes.buttonClose}
                    />
                    {!backgroundVideoURL ? <Box
                        className={classes.image}
                        style={{ backgroundImage: `url(${imageURL})`, height: height }}
                    />
                    :
                    // On ne peut pas mettre directemnt le tag <video> car l'attribut mute est ignoré par react. Ref : https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5
                    <div
                    dangerouslySetInnerHTML={{
                        __html:
                        `<video
                            style="min-height:100%; object-fit:cover; position:absolute; left:0;"
                            loop
                            class='backgroundVideo'
                            playsinline
                            autoplay
                            muted
                            preload='auto'
                        >
                            <source src='`+backgroundVideoURL +`' type="video/mp4" />
                        </video>`
                    }}
                    />
                    }
                    <Box
                        className={classes.content}
                    >
                        {locked
                            ? <Box className={classes.iconContainer} >
                                {lockIcon({ ref: lockIconRef, className: classes.lock })}
                            </Box>
                            : videoURL
                                ? <Box className={classes.iconContainer} >
                                    <IconButton
                                        onClick={() => playVideo(true)}
                                        className={classes.playButton}>
                                        { playIcon({ className: classes.play }) }
                                    </IconButton>
                                </Box>
                                : <Box className={classes.topGradient}/>
                        }
                        <Box
                            className={classes.containerText}
                            ref={ boxTextRef }
                        >
                            <Typography
                                variant="h2"
                                className={classes.title}
                                align={'center'}
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                            <Typography
                                variant="subtitle2"
                                className={classes.description}
                                align={'center'}
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Slide>
            {videoURL &&
            <VideoPlayerFloat
                ref={videoRef}
                source={videoURL}
                handleClose={() => playVideo(false)}
                style={{ visibility: videoVisible ? 'visible' : 'hidden' }}
                open={videoVisible}
            />
            }
        </React.Fragment>)
}
export default forwardRef(Gift)
