import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import { Typography } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/gifts/giftResult.style'

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
