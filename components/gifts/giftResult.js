import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import SvgIcon from '@material-ui/core/SvgIcon'

const useStyles = makeStyles((theme = useTheme) => ({
    container: {
        border: 'solid',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        borderWidth: '2px',
        borderColor: theme.palette.primary.contrastText,
        marginBottom: '10px',
        maxWidth: '70vw'
    },
    text: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        textAlign: 'center',
        lineHeight: 1
    },
    cadeau: {
        fill: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        maxWidth: '50px',
        maxHeight: '50px',
        borderRadius: '100%'
    },
    medal: {
        fill: theme.palette.primary.contrastText,
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        maxWidth: '50px',
        maxHeight: '50px',
        position: 'absolute',
        top: 0,
        left: 0
    }
}))

function GiftResult (props) {
    const classes = useStyles()
    const [gifts, setGifts] = useState([])

    return (
        <Box className={classes.container}>
            {giftIcon({ className: classes.cadeau })}
            <Typography className={classes.text}>
                VOUS GAGNEZ UNE RECOMPENSE !
            </Typography>
        </Box>
    )
}

export default GiftResult
