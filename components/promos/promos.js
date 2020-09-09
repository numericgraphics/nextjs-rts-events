import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import PromoLogo from './promoLogo'
import PromoNoLogo from './promoNoLogo'
import PromoImage from './promoImage'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

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

const useStyles = makeStyles({
    promos: {
        overflowX: 'visible'
        // opacity: 0,
        // WebkitAnimationName: 'fadeIn',
        // WebkitAnimationDuration: '1s',
        // WebkitAnimationTimingFunction: 'ease-in',
        // WebkitAnimationDelay: '1s',
        // WebkitAnimationFillMode: 'forwards'
    },
    containerGlobal: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '100vw',
        // height: 500
    }
})

function Promos (props) {
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        setActiveStep(0)
    }, [])

    return (
        <Box className={classes.containerGlobal}>
            <SwipeableViews
                className={classes.promos}
                enableMouseEvents
                onChangeIndex={(index) => {
                    setActiveStep(index)
                    props.indexCallBack(index)
                }}
            >
                {props.data.map((item, index) => getPromoTemplate(item, index, activeStep)
                )}
            </SwipeableViews>
        </Box>
    )
}

export default Promos
