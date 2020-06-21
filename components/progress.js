import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    containerProgress: {
        display: 'flex',
        flexDirection: 'column',
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
        <Container className={classes.containerProgress}>
            <CircularProgress />
        </Container>
    )
}

export default Progress
