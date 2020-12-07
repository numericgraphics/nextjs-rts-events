import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/endGameInformation.style'
import Grow from '@material-ui/core/Grow'
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import { CustomDisabledButton } from '../ui/button/CustomDisabledButton'

function EndgameInformation (props, ref) {
    const classes = useStyles()
    const { open, handleClose, translation, uiElements, handleOpenTypeForm } = props
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
                exit: 500
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
                <CustomDisabledButton
                    color="secondary"
                    variant="contained"
                    className={'button'}
                    onClick={handleOpenTypeForm} >
                    {`${translation.feedbackButtonOnDashboard}`}
                </CustomDisabledButton>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(EndgameInformation)
