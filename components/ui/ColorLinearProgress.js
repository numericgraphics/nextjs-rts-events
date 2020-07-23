import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

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

function ColorLinearProgress (props) {
    const classes = useStyles()
    const { color, progress } = props

    return (
        <Box className={classes.container}>
            <LinearProgress variant="determinate" color={color} value={progress} className={classes.linearProgress}/>
        </Box>
    )
}

export default ColorLinearProgress
