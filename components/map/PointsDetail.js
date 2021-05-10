import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/components/map/pointDetail.style.js'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

function MainMap (props) {
    const classes = useStyles()
    const { pointList, setPointList } = props
    const pointListIndex = pointList.length - 1
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(0)
        console.log(index)
        console.log(pointList)
    }, [pointList])

    function nextPicture () {
        if (index < pointListIndex) {
            setIndex(index + 1)
        } else if (index === pointListIndex) {
            setIndex(0)
        }
    }

    function previousPicture () {
        if (index !== 0) {
            setIndex(index - 1)
        } else if (index === 0) {
            setIndex(pointListIndex)
        }
    }

    function getDisplay (index) {
        if (index >= pointList.length) {
            setIndex(0)
            index = 0
        }
        const nickname = pointList[index].properties.nickname
        const imageURL = pointList[index].properties.imageURL

        return (
            <Box className={classes.detailContainer}>
                <Box>
                    Test
                </Box>
                <Typography className={classes.title}>{nickname}</Typography>
                <Box className={classes.imageContainer}>
                    <img src={imageURL} style={{ objectFit: 'cover', height: '100%', width: '100%' }}/>
                    <Box className={classes.previousImage} onClick={previousPicture}/>
                    <Box className={classes.nextImage} onClick={nextPicture}/>
                </Box>
            </Box>
        )
    }

    return (
        pointList && getDisplay(index)
    )
}
export default MainMap
