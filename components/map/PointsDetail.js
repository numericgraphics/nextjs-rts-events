import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/components/map/pointDetail.style.js'
import Button from '@material-ui/core/Button'

function MainMap (props) {
    const classes = useStyles()
    const { pointList, setPointList } = props
    const pointListIndex = pointList.length - 1
    const [index, setIndex] = useState(0)

    function nextPicture () {
        console.log('index', index)
        console.log('plistLenght', pointListIndex)
        if (index < pointListIndex) {
            setIndex(index + 1, () => console.log('ici', index))
        } else if (index === pointListIndex) {
            setIndex(0)
        }
    }

    function previousPicture () {
        console.log('index', index)
        console.log('plistLenght', pointListIndex)
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
        console.log(pointList)
        const nickname = pointList[index].properties.nickname
        const imageURL = pointList[index].properties.imageURL

        return (
            <Box>
                {nickname}
                {imageURL}
            </Box>
        )
    }
    return (
        <Box className={classes.container}>
            <Button onClick={previousPicture}>
                Previous Picture
            </Button>
            <Button onClick={nextPicture}>
                Next Picture
            </Button>
            {pointList && getDisplay(index)}
        </Box>
    )
}
export default MainMap
