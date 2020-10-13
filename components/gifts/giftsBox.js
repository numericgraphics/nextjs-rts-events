import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme = useTheme) => ({
    gift: {
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        marginLeft: '10px',
        marginRight: '10px',
        maxWidth: '50px',
        maxHeight: '50px',
        backgroundColor: theme.palette.primary.main,
        marginTop: 10,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    gifts: {
        display: 'flex',
        margin: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    textRegularCenter: {
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.1rem'
    },
    cadeau: {
        fill: theme.palette.primary.contrastText,
        minHeight: '34px',
        minWidth: '34px',
        width: '10vw',
        height: '10vw',
        maxWidth: '50px',
        maxHeight: '50px',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
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
        left: 0,
        zIndex: 1
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
        fill: 'white',
        zIndex: 1
    }
}))

function GiftsBox (props) {
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
        return <IconButton onClick={() => setGift(item) } color="primary" key={index} className={classes.gift}>
            {item.locked && lockIcon({ className: classes.lock }) }
            {item.type === 'lottery' ? giftIcon({ className: classes.cadeau, key: index })
                : medalIcon({ className: classes.medal })}
        </IconButton>
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
