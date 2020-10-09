import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { ColorLinearProgress } from './ui/ColorLinearProgress'

const useStyles = makeStyles({
    container: {
        width: '100%',
        margin: 10
    },
    linearProgress: {
        height: 30,
        borderRadius: 16
    }
})

function DashBoardChallengesProgress (props) {
    const classes = useStyles()
    const { progress } = props

    return (
        <Box className={classes.container}>
            <ColorLinearProgress variant="determinate" style={{ color: 'white' }} value={progress} className={classes.linearProgress}/>
        </Box>
    )
}

export default DashBoardChallengesProgress
