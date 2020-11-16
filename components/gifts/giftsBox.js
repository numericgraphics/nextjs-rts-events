import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/giftsBox.style'
import Typography from '@material-ui/core/Typography'
import { medalIcon, giftIcon, lockIcon } from '../../data/icon'
import IconButton from '@material-ui/core/IconButton'

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
        <Box className={classes.containerGifts}>
            <Typography variant='subtitle1' className={[classes.textRegularCenter].join(' ')}>
                {props.translation}
            </Typography>
            <Box className={classes.gifts}>
                {gifts ? gifts.map((item, index) => getGift(item, index)) : null}
            </Box>
        </Box>
    )
}

export default GiftsBox
