import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import PromoLogo from './promoLogo'
import PromoNoLogo from './promoNoLogo'
import PromoImage from './promoImage'

const EnhancedSwipeableViews = bindKeyboard(SwipeableViews)

function Promos (props) {
    const [activeStep, setActiveStep] = useState(0)
    const [isMoving, setMoving] = useState(false)

    function getPromoTemplate (item, index, activeStep) {
        const dynamicProps = { key: index, data: item, selected: (activeStep === index), isMoving: isMoving }
        switch (item.type) {
        case 'Logo':
            return <PromoLogo {...dynamicProps} />
        case 'NoLogo':
            return <PromoNoLogo {...dynamicProps}/>
        case 'Image':
            return <PromoImage {...dynamicProps}/>
        }
    }

    useEffect(() => {
        setActiveStep(0)
    }, [])

    // TODO - remove blur for testing
    return (
        <EnhancedSwipeableViews
            className='background'
            // className={['background', { backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%)' }].join(' ')}
            // style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%)' }}
            axis={'y'}
            animateHeight={true}
            // style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}
            enableMouseEvents
            onChangeIndex={(index) => {
                setActiveStep(index)
                props.indexCallBack(index)
            }}
            onSwitching={(index, type) => {
                setMoving(type === 'move')
            }}
            onTransitionEnd={() => {
                console.log('onTransitionEnd')
            }}
        >
            {props.data.map((item, index) => getPromoTemplate(item, index, activeStep, isMoving))}
        </EnhancedSwipeableViews>
    )
}

export default Promos
