import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { medalIcon, giftIcon, lockIcon } from './icon'
import IconButton from '@material-ui/core/IconButton'

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
            maxHeight: '50px',
            backgroundColor: theme.palette.primary.main
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
            fill: 'white',
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            maxWidth: '50px',
            maxHeight: '50px',
            position: 'absolute',
            top: 0,
            left: 0
        },
        medal: {
            fill: 'white',
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            maxWidth: '50px',
            maxHeight: '50px',
            position: 'absolute',
            top: 0,
            left: 0
        },
        lock: {
            position: 'absolute',
            top: 0,
            right: '70%',
            minHeight: '17px',
            minWidth: '17px',
            maxWidth: '25px',
            maxHeight: '25px',
            width: '7.5vw',
            height: '7.5vw',
            fill: 'white'
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

    function getGift (item, index) {
        switch (item.type) {
        case 'lottery':
            return <IconButton onClick={() => setGift(item) } color="primary" key={index} className={classes.gift}>
                {item.locked && lockIcon({ className: classes.lock, key: index + 1 }) }
                { giftIcon({ className: classes.cadeau, key: index }) }
            </IconButton>
        case 'medal':
            return <IconButton onClick={() => setGift(item)} color="primary" key={index} className={classes.gift}>
                {item.locked && lockIcon({ className: classes.lock, key: index + 1 }) }
                { medalIcon({ className: classes.medal, key: index })}
            </IconButton>
        }
    }
    return (
        <Box className={classes.container}>
            <Typography className={classes.textRegularCenter}>
                {props.translation}
            </Typography>
            <Box className={classes.gifts}>
                {gifts ? gifts.map((item, index) => getGift(item, index)) : null}
            </Box>
        </Box>
    )
}

export default GiftsBox
