import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Promo from './promo'

export default function Promos (props) {
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
                    <Promo key={index} data={item} selected={activeStep === index}/>
                )
            })}
        </SwipeableViews>
    )
}
