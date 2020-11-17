import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    containerProgress: {
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))

// TODO - unused component to remove
function CustomBackDrop (props) {
    const { open } = props
    const classes = useStyles()

    return (
        <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress />
        </Backdrop>

    )
}

export default CustomBackDrop
