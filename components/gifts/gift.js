// import React, { createRef, useEffect, useRef, useState } from 'react'
import React from 'react'
import Box from '@material-ui/core/Box'
// import Typography from '@material-ui/core/Typography'
import { useHeight } from '../../hooks/useHeight'
import { useStyles } from '../../styles/jsx/components/modal/hasGiftsModal.style'
import IconButton from '@material-ui/core/IconButton'
// import { closeIcon, lockIcon } from '../../data/icon'
import { closeIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'

function Gift (props, ref) {
    const classes = useStyles()
    const height = useHeight()
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

    return (
        <Slide direction="up" in={props.open} timeout={500} mountOnEnter unmountOnExit>
            <Box ref={ref}
                className={['backgroundModal', 'containerModal', 'bg-top-cover'].join(' ')}
                style={{ backgroundImage: `url(${props.gift.imageURL})`, height: height }}
                tabIndex={'-1'}>
                <IconButton onClick={props.handleClose} color="secondary" className={classes.closeBtn}>
                    { closeIcon({ className: classes.closeIcon }) }
                </IconButton>
            </Box>
        </Slide>
    )
}
export default React.forwardRef(Gift)
