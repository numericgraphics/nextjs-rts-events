import React, { useEffect, useState, useRef, createRef } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../../styles/jsx/gifts/gift.style'
import IconButton from '@material-ui/core/IconButton'
import { closeIcon, lockIcon, playIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import VideoPlayerGift from '../ui/video/VideoPlayerGift'

export const ModalStates = Object.freeze({
    GIFT: 'gift',
    GIFT_VIDEO: 'giftVideo'
})

function Gift (props, ref) {
    const { open, handleClose, gift } = props
    const classes = useStyles()
    const [onTransition, setTransition] = useState(undefined)
    const boxTextRef = useRef()
    const lockIconRef = createRef()
    const videoRef = useRef()
    const [modalState, setModalState] = useState(ModalStates.GIFT)

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

    function getModalContent () {
        switch (modalState) {
        case ModalStates.GIFT:
            return <Box ref={ref}
                className={['backgroundModal', 'containerModal', classes.containerModal].join(' ')}
                tabIndex={'-1'}>
                <Box className={classes.image} style={{ backgroundImage: `url(${props.gift.imageURL})` }}/>
                <IconButton onClick={transitionClose} color="secondary" className={classes.closeBtn}>
                    { closeIcon({ className: classes.closeIcon }) }
                </IconButton>
                <Box className={classes.content} >
                    {gift.locked
                        ? <Box className={classes.iconContainer} >
                            {lockIcon({ ref: lockIconRef, className: classes.lock })}
                        </Box>
                        : gift.videoURL
                            ? <Box className={classes.iconContainer} >
                                <IconButton onClick={() => setModalState(ModalStates.GIFT_VIDEO)} className={classes.playButton}>
                                    { playIcon({ className: classes.play }) }
                                </IconButton>
                            </Box> : <Box className={classes.topGradient} />
                    }
                    <Box className={classes.containerText} ref={ boxTextRef }>
                        <Typography variant="h2" className={classes.title} align={'center'}
                            dangerouslySetInnerHTML={{ __html: gift.title }}>
                        </Typography>
                        <Typography variant="subtitle2" className={classes.description} align={'center'}
                            dangerouslySetInnerHTML={{ __html: gift.message }}>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        case ModalStates.GIFT_VIDEO:
            return <VideoPlayerGift src={props.gift.videoURL} ref={videoRef} imageURL={props.gift.imageURL} handleClose={props.handleClose} />
        }
    }

    return (
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
            {getModalContent()}
        </Slide>
    )
}
export default React.forwardRef(Gift)
