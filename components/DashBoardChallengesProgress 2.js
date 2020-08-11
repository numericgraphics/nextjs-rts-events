import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { ColorLinearProgress } from './ui/ColorLinearProgress'

const useStyles = makeStyles({
    container: {
        width: '70vw',
        margin: 10
    },
    linearProgress: {
        height: 15,
        borderRadius: 5
    }
})

function DashBoardChallengesProgress (props) {
    const classes = useStyles()
    const { progress } = props

    return (
        <Box className={classes.container}>
            <ColorLinearProgress variant="determinate" color={'primary'} value={progress} className={classes.linearProgress}/>
        </Box>
    )
}

export default DashBoardChallengesProgress
