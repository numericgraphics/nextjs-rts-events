import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme = useTheme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        marginBottom: '10px',
        maxWidth: '70vw',
        flexDirection: 'column',
        marginTop: '25px'
    },
    text: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.10rem',
        textAlign: 'left',
        marginLeft: '5px',
        marginRight: '15px',
        lineHeight: 1,
        color: theme.palette.secondary.contrastText
    },
    giftIcon: {
        fill: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        minHeight: '34px',
        minWidth: '34px',
        fontSize: '5rem!important',
        maxWidth: '50px',
        maxHeight: '50px',
        borderRadius: '100%'
    },
    lock: {
        position: 'absolute',
        marginTop: '-20px',
        height: '32.4px',
        width: '32.4px',
        zIndex: 2
    },
    gift: {
        backgroundColor: theme.palette.primary.main,
        height: '3rem',
        width: '3rem'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        borderRadius: 40,
        backgroundColor: theme.palette.secondary.light,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        textTransform: 'none!important',
        boxShadow: 'none!important',
        height: '100%',
        width: '100%',
        zIndex: 1,
        '&:hover':
            {
                backgroundColor: theme.palette.secondary.dark
            }
    }
}))
// TODO merge giftResult dans giftBox, si il y a plus d'un gift afficher la gift box

function GiftResult (props) {
    const classes = useStyles()
    const gift = props.gift[props.gift.length - 1]

    useEffect(() => {
        props.setGift(gift)
    }, [gift])

    function getGift (item) {
        return item.type === 'lottery' ? giftIcon({ className: classes.giftIcon })
            : medalIcon({ className: classes.giftIcon })
    }
    // Refactoriser le bouton
    return (
        <Box className={props.className ? props.className : classes.container }>
            {gift.locked && lockIcon({ className: classes.lock }) }
            <Button
                variant="contained"
                className={classes.button}
                onClick={props.onClick}
                startIcon={ gift ? getGift(gift) : null }
            >
                <Typography className={classes.text} >
                    {props.translation}
                </Typography>
            </Button>
        </Box>
    )
}

export default GiftResult
