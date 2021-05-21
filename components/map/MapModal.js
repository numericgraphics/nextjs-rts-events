import React, { useEffect, useState, useRef, forwardRef } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/gifts/gift.style'
import { useHeight } from '../../hooks/useHeight'
import Slide from '@material-ui/core/Slide/Slide'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import MainMap from './MainMap'

function MapModal (props, ref) {
    const { open, handleClose, defi } = props
    const classes = useStyles()
    const height = useHeight()
    const [onTransition, setTransition] = useState(undefined)
    const videoRef = useRef()

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
                    <Box style={{ width: '100%', height: '100%' }}>
                        <MainMap defi={defi} isModal={true} />
                    </Box>
                </Box>
            </Slide>
        </React.Fragment>)
}
export default forwardRef(MapModal)
