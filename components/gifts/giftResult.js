import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme = useTheme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        backgroundColor: theme.palette.secondary.light,
        marginBottom: '10px',
        maxWidth: '70vw',
        flexDirection: 'column',
        marginTop: '25px'
    },
    text: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.10rem',
        textAlign: 'left',
        marginLeft: '15px',
        marginRight: '15px',
        lineHeight: 1
    },
    giftIcon: {
        fill: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        minHeight: '34px',
        minWidth: '34px',
        fontSize: '5rem',
        maxWidth: '50px',
        maxHeight: '50px',
        borderRadius: '100%',
        position: 'absolute'
    },
    lock: {
        position: 'absolute',
        marginTop: '-20px',
        height: '32.4px',
        width: '32.4px'
    },
    gift: {
        backgroundColor: theme.palette.primary.main,
        height: '3rem',
        width: '3rem'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center'
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
        return <IconButton color="primary" className={classes.gift} onClick={props.onClick} >
            {item.type === 'lottery' ? giftIcon({ className: classes.giftIcon })
                : medalIcon({ className: classes.giftIcon })}
        </IconButton>
    }

    return (
        <Box className={classes.container} onClick={props.onClick}>
            {gift.locked && lockIcon({ className: classes.lock }) }
            <Box className={classes.giftContainer}>
                {gift ? getGift(gift) : null}
                <Typography className={classes.text}>
                    {props.translation}
                </Typography>
            </Box>
        </Box>
    )
}

export default GiftResult
