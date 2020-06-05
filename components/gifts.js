import React, { useEffect, useState } from 'react'
import Gift from './gift'
import SwipeableViews from 'react-swipeable-views'

export default function Gifts (props) {
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        setActiveStep(0)
    }, [])

    return (
        <SwipeableViews
            enableMouseEvents
            onChangeIndex={(index) => {
                setActiveStep(index)
                props.indexCallBack(index)
            }}
        >
            {props.data.map((item, index) => {
                return (
                    <Gift key={index} description={item.description} selected={activeStep === index}/>
                )
            })}
        </SwipeableViews>
    )
}
