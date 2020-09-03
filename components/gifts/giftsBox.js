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
            fill: theme.palette.primary,
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        medal: {
            fill: theme.palette.primary,
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        lockedGiftIcon: {
            opacity: '0.5',
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        lockedMedal: {
            opacity: '0.5',
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        cadenasIcon: {
            minHeight: '6.8px',
            minWidth: '6.8px',
            maxWidth: '10px',
            maxHeight: '10px',
            width: '3vw',
            height: '3vw'
        }
    })

    const classes = useStyles()
    const [gifts, setGifts] = useState([])

    useEffect(() => {
        setGifts(props.gifts)
    }, [props.gifts])

    const setGift = (gift) => {
        props.setGift(gift)
        props.onClick()
    }

    function getGifts (gifts, props) {
        // eslint-disable-next-line prefer-const
        let re = []
        if (!gifts) {
            return null
        }

        gifts.map((gift, index) => {
            if (gift.type === 'lottery') {
                if (gift.locked) {
                    re.push(lockedGiftIcon({ onClick: () => setGift(gift), classeGift: classes.lockedGiftIcon, key: index }))
                } else {
                    re.push(giftIcon({ onClick: () => setGift(gift), classeGift: classes.cadeau, key: index }))
                }
            } else if (gift.type === 'medal') {
                if (gift.locked) {
                    re.push(disabledMedalIcon({ onClick: () => setGift(gift), classeGift: classes.lockedMedal, key: index }))
                } else {
                    re.push(medalIcon({ onClick: () => setGift(gift), classeGift: classes.medal, key: index }))
                }
            }
        })
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
