import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/endGameInformation.style'
import Grow from '@material-ui/core/Grow'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'

function EndgameInformation (props, ref) {
    const classes = useStyles()
    const { open, handleClose, translation, uiElements, feedback } = props
    const [onTransition, setTransition] = useState(undefined)

    function onExited () {
        handleClose()
    }

    function transitionClose () {
        setTransition(false)
    }

    useEffect(() => {
        setTransition(open)
    }, [])

    return (
        <Grow
            in={onTransition}
            timeout={{
                appear: 1000,
                enter: 1000,
                exit: 200
            }}
            onExited={onExited}
        >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <ButtonCloseModal handleClose={transitionClose} className={classes.buttonClose}/>
                <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: uiElements.noMoreChallengesChunk }}/>
                <Typography variant='h4' className={[].join(' ')}
                    dangerouslySetInnerHTML={{ __html: translation.feedbackTitle }}>
                </Typography>
                <Typography variant='subtitle2' className={classes.subTitle}
                    dangerouslySetInnerHTML={{ __html: translation.feedbackMessage }} >
                </Typography>
                {feedback}
            </Box>
        </Grow>
    )
}

export default React.forwardRef(EndgameInformation)
