import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    gift: {
        height: 'auto',
        width: '34px'
    },
    gifts: {
        display: 'flex',
        margin: '10px'
    },
    textRegularCenter: {
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.1rem'
    }
})

function GiftsBox (props) {
    const classes = useStyles()
    const gifts = props.gifts

    function getGifts (gifts) {
        // eslint-disable-next-line prefer-const
        let re = []
        for (let i = 0; i < gifts.length; i++) {
            re.push(<img className={classes.gift} src={gifts[i].imageURL} />)
        }
        return re
    }
    console.log(gifts)
    return (
        <Box className={classes.container}>
            <Typography className={classes.textRegularCenter}>
                Vos recompense :{ /* `${gameStats.totalChallengesCount} ${translation.dashBoardChallengesOfTheDay}` */ }
            </Typography>
            <Box className={classes.gifts}>
                {getGifts(gifts)}
            </Box>
        </Box>
    )
}

export default GiftsBox
