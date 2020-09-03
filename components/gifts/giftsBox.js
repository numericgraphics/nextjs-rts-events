import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { lockedGiftIcon, disabledMedalIcon, medalIcon, giftIcon } from './icon'

function GiftsBox (props) {
    const theme = useTheme()
    const useStyles = makeStyles({
        gift: {
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        gifts: {
            display: 'flex',
            margin: '10px',
            justifyContent: 'center'
        },
        textRegularCenter: {
            textAlign: 'center',
            fontFamily: 'srgssr-type-Rg',
            fontSize: '1.1rem'
        },
        cadeau: {
            fill: theme.palette.primary
        },
        medal: {
            fill: theme.palette.primary
        },
        lockedGiftIcon: {
            opacity: '0.5'
        },
        lockedMedal: {
            opacity: '0.5'
        }
    })

    const classes = useStyles()
    const [gifts, setGifts] = useState([])

    useEffect(() => {
        setGifts(props.gifts)
    }, [props.gifts])

    function getGifts (gifts, props) {
        // eslint-disable-next-line prefer-const
        let re = []
        if (!gifts) {
            return null
        }
        for (let i = 0; i < gifts.length; i++) {
            if (gifts[i].type === 'lottery') {
                gifts[i].locked ? re.push(lockedGiftIcon({ classeLockedCadeau: classes.lockedGiftIcon, classeGift: classes.gift, gifts: gifts, key: i, onClick: props.onClick, id: gifts[i].giftID, setGift: props.setGift })) : re.push(giftIcon({ classeCadeau: classes.cadeau, classeGift: classes.gift, gifts: gifts, key: i, onClick: props.onClick, id: gifts[i].giftID, setGift: props.setGift }))
            } else if (gifts[i].type === 'medal') {
                gifts[i].locked ? re.push(disabledMedalIcon({ classeLockMedal: classes.lockedMedal, classeGift: classes.gift, gifts: gifts, key: i, onClick: props.onClick, id: gifts[i].giftID, setGift: props.setGift })) : re.push(medalIcon({ classeMedal: classes.medal, classeGift: classes.gift, gifts: gifts, key: i, onClick: props.onClick, id: gifts[i].giftID, setGift: props.setGift }))
            }
        }
        return re
    }

    return (
        <Box className={classes.container}>
            <Typography className={classes.textRegularCenter}>
                {props.translation}
            </Typography>
            <Box className={classes.gifts}>
                {getGifts(gifts, props)}
            </Box>
        </Box>
    )
}

export default GiftsBox
