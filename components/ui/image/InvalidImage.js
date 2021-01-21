import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow/Grow'
import InvalidImageProgress from '../progress/InvalidImageProgress'

function InvalidImage (props, ref) {
    const classes = useStyles()
    // TODO add uiElements for translation
    const { open, reSnap, gotoDashBoard, recoScore, translation } = props
    const [onTransition, setTransition] = useState(undefined)
    const [onRetry, setRetry] = useState(false)

    function onExited () {
        onRetry ? reSnap() : gotoDashBoard()
    }

    function onTryAgain () {
        setRetry(true)
        setTransition(false)
    }

    function onCancel () {
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
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                    dangerouslySetInnerHTML={{ __html: translation.challengeQuestionImageInvalidText }}
                />
                <InvalidImageProgress
                    variant="determinate"
                    progress={recoScore}
                />
                <Button
                    key={'resnap'}
                    color="secondary"
                    variant="contained"
                    className={'button'}
                    onClick={onTryAgain} >
                    {translation.challengeQuestionImageReSnap}
                </Button>
                <Button
                    key={'cancel'}
                    className={['text2', classes.textButton].join(' ')}
                    onClick={onCancel} >
                    {translation.challengeQuestionImageCancel}
                </Button>
            </Box>
        </Grow>
    )
}
export default React.forwardRef(InvalidImage)
