import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles, useTheme } from '@material-ui/core/styles'

export default function ColorBackdrop () {
    const theme = useTheme()
    const classes = makeStyles(() => ({
        backdrop: {
            background: theme.palette.background.default
        }
    }))

    return <Backdrop className={classes.backdrop} open/>
}
