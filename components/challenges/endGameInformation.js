import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/hasLoginModal.style'

function EndgameInformations (props, ref) {
    const classes = useStyles()
    return (
        <Box ref={ref} className={classes.modalContent}>
            <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: 'Fin du jeu' }}/>
            <Typography variant='subtitle1' className={[].join(' ')}
                dangerouslySetInnerHTML={{ __html: props.uiElements.noMoreChallengesChunk }}>
            </Typography>
            <Typography variant='subtitle1' className={[].join(' ')}
                dangerouslySetInnerHTML={{ __html: props.uiElements.finalResultScoreChunk }} >
            </Typography>
        </Box>
    )
}

export default React.forwardRef(EndgameInformations)
