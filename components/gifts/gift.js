import React, { createRef, useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useHeight } from '../../hooks/useHeight'
import { useStyles } from '../../styles/jsx/components/modal/hasGiftsModal.style'
import IconButton from '@material-ui/core/IconButton'
import { closeIcon, lockIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import VideoPlayer from '../ui/video/VideoPlayer'

function Gift (props, ref) {
    const classes = useStyles()
    const height = useHeight()
    const boxTextRef = useRef()
    const lockIconRef = createRef()
    const [boxHeight, setBoxHeight] = useState(0)
    const videoRef = useRef()

    function handleResize () {
        setBoxHeight(boxTextRef.current ? boxTextRef.current.clientHeight : null)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    useEffect(() => {
        if (open) {
            setTimeout(handleResize, 10)
            videoRef.current.play()
        }
    }, [open])

    console.log(props.gift)
    return (
        <Slide direction="up" in={props.open} timeout={500} mountOnEnter unmountOnExit>
            {props.gift.videoURL
                ? <VideoPlayer
                    className={['backgroundModalGift', 'bg-top-cover'].join(' ')}
                    ref={videoRef}
                    videoSource={props.gift.videoURL}
                    videoPoster={props.gift.imageURL}
                    showVideo={true}
                    blurVideo={false}
                    style={{ visibility: 'visible' }}
                />
                : <Box ref={ref}
                    className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                    style={{ backgroundImage: `url(${props.gift.imageURL})`, height: height }}
                    tabIndex={'-1'}>
                    <IconButton onClick={props.handleClose} color="secondary" className={classes.closeBtn}>
                        { closeIcon({ className: classes.closeIcon }) }
                    </IconButton>
                    <Box className={classes.footer} style={{ height: height }}>
                        <Box className={classes.gradient} />
                        <Box className={classes.containerText} ref={ boxTextRef }>
                            <Typography variant="h2" className={classes.title} align={'center'}
                                dangerouslySetInnerHTML={{ __html: props.gift.title }}>
                            </Typography>
                            <Typography variant="subtitle2" className={classes.description} align={'center'}
                                dangerouslySetInnerHTML={{ __html: props.gift.message }}>
                            </Typography>
                        </Box>
                        {props.gift.locked ? <Box className={classes.lockContainer} style={{ bottom: boxHeight - 1 }}>
                            {lockIcon({ ref: lockIconRef, className: classes.lock })}
                        </Box> : null }
                    </Box>
                </Box>
            }
        </Slide>
    )
}
export default React.forwardRef(Gift)
