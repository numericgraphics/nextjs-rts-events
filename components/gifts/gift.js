import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
// import Typography from '@material-ui/core/Typography'
// import { useHeight } from '../../hooks/useHeight'
import { useStyles } from '../../styles/jsx/components/modal/hasGiftsModal.style'
import IconButton from '@material-ui/core/IconButton'
// import { closeIcon, lockIcon } from '../../data/icon'
import { closeIcon } from '../../data/icon'
// import { closeIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'

function Gift (props, ref) {
    const { open, handleClose } = props
    const classes = useStyles()
    const [onTransition, setTransition] = useState(undefined)
    // const height = useHeight()
    // const boxTextRef = useRef()
    // const lockIconRef = createRef()
    // const [boxHeight, setBoxHeight] = useState(0)

    // function handleResize () {
    //     setBoxHeight(boxTextRef.current ? boxTextRef.current.clientHeight : null)
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [handleResize])
    //
    // useEffect(() => {
    //     if (open) {
    //         setTimeout(handleResize, 10)
    //     }
    // }, [open])

    useEffect(() => {
        setTransition(open)
    }, [])

    function onExited () {
        handleClose()
    }

    function transitionClose () {
        setTransition(false)
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
            <Box ref={ref}
                className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                tabIndex={'-1'}>
                <img src={props.gift.imageURL} className={'bg-top-cover'} onLoad={() => {
                    console.log('onload dispatched')
                }}/>
                <IconButton onClick={transitionClose} color="secondary" className={classes.closeBtn}>
                    { closeIcon({ className: classes.closeIcon }) }
                </IconButton>
            </Box>
        </Slide>
    )
}
export default React.forwardRef(Gift)
