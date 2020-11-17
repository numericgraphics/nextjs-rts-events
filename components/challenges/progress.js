import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useHeight } from '../../hooks/useHeight'

const useStyles = makeStyles({
    containerProgress: {
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
})

// TODO - unused component to remove
function Progress () {
    const classes = useStyles()
    const height = useHeight()

    return (
        <Box class={classes.containerProgress} style={{ minHeight: height }}>
            <CircularProgress />
        </Box>
    )
}

export default Progress
