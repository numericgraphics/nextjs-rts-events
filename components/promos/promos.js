import React, { useEffect, useState } from 'react'
import { useStyles } from '../../styles/promo.style'
import SwipeableViews from 'react-swipeable-views'
import PromoLogo from './promoLogo'
import PromoNoLogo from './promoNoLogo'
import PromoImage from './promoImage'

function getPromoTemplate (item, index, activeStep) {
    const dynamicProps = { key: index, data: item, selected: (activeStep === index) }
    switch (item.type) {
    case 'Logo':
        return <PromoLogo {...dynamicProps} />
    case 'NoLogo':
        return <PromoNoLogo {...dynamicProps}/>
    case 'Image':
        return <PromoImage {...dynamicProps}/>
    }
}

function Promos (props) {
    const styles = useStyles()
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        setActiveStep(0)
    }, [])

    return (
        <SwipeableViews
            className={['background', styles.promosAnimation].join(' ')}
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

export default Promos
