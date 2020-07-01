import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import InnerHeightLayout from './innerHeightLayout'

const useStyles = makeStyles({
    containerProgress: {
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    }
})

function Progress () {
    const classes = useStyles()
    return (
        <InnerHeightLayout class={classes.containerProgress} >
            <CircularProgress />
        </InnerHeightLayout>
    )
}

export default Progress
