import React, { useEffect, useState, useRef, forwardRef } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/components/modal/dailyPromoModal.style'
import Slide from '@material-ui/core/Slide/Slide'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import DailyPromo from './dailyPromo'

function DailyPromoModal (props, ref) {
    const { open, handleClose, dailyPromo, translation } = props
    const classes = useStyles()
    const [onTransition, setTransition] = useState(undefined)
    const videoRef = useRef()

    console.log(dailyPromo)

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
                    <DailyPromo dailyPromo={dailyPromo} isDailyPromo={true} closeModal={handleClose} />
                </Box>
            </Slide>
        </React.Fragment>)
}
export default forwardRef(DailyPromoModal)
