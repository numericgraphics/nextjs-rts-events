import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/modal/hasLoginModal.style'
import Grow from '@material-ui/core/Grow'

function EndgameInformations (props, ref) {
    const classes = useStyles()
    return (
        <Grow
            in={props.open}
            timeout={1000}
        >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: props.uiElements.noMoreChallengesChunk }}/>
                <Typography variant='h4' className={[].join(' ')}
                    dangerouslySetInnerHTML={{ __html: props.translation.feedbackTitle }}>
                </Typography>
                <Typography variant='subtitle2' className={[].join(' ')}
                    dangerouslySetInnerHTML={{ __html: props.translation.feedbackMessage }} >
                </Typography>
                {props.button}
            </Box>
        </Grow>
    )
}

export default React.forwardRef(EndgameInformations)
