import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import PromoLogo from './promoLogo'
import PromoNoLogo from './promoNoLogo'
import PromoImage from './promoImage'

function getPromoTemplate (item, index, activeStep) {
    switch (item.type) {
    case 'Logo':
        return <PromoLogo key={index} data={item} selected={activeStep === index}/>
    case 'NoLogo':
        return <PromoNoLogo key={index} data={item} selected={activeStep === index}/>
    case 'Image':
        return <PromoImage key={index} data={item} selected={activeStep === index}/>
    }
}

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
            {props.data.map((item, index) => getPromoTemplate(item, index, activeStep)
            )}
        </SwipeableViews>
    )
}
