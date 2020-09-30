import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import LayoutPromo from './layoutPromo'

const EnhancedSwipeableViews = bindKeyboard(SwipeableViews)

function SwipeableTemplates (props) {
    const [activeStep, setActiveStep] = useState(0)
    const [isMoving, setMoving] = useState(false)

    function getPromoTemplate (item, index, activeStep) {
        const dynamicProps = { key: index, data: item, selected: (activeStep === index), isMoving: isMoving }
        return <LayoutPromo {...dynamicProps}/>
    }

    useEffect(() => {
        setActiveStep(0)
    }, [])

    // TODO - remove blur for testing
    return (
        <EnhancedSwipeableViews
            className='backgroundSwipeableView'
            axis={'y'}
            animateHeight={true}
            style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}
            enableMouseEvents
            onChangeIndex={(index) => {
                setActiveStep(index)
                props.indexCallBack(index)
            }}
            onSwitching={(index, type) => {
                setMoving(type === 'move')
            }}
        >
            {props.data.map((item, index) => getPromoTemplate(item, index, activeStep, isMoving))}
        </EnhancedSwipeableViews>
    )
}

export default SwipeableTemplates
