/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import PromosStepper from './promosStepper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Promos from './promos'
import UserContext from '../UserContext'
import hasLoginModal from '../../hoc/hasLoginModal'

function PromoPage (props) {
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading } = store

    function onStart () {
        props.openModal()
    }

    function slideIndexCallBack (index) {
        setActiveStep(index)
    }

    function handleUrlQuery () {
        const params = (new URL(document.location)).searchParams
        if (params.get('modal')) {
            setTimeout(() => {
                props.openModal()
            }, 2000)
        }
    }

    useEffect(() => {
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
        handleUrlQuery()
    }, [])

    // TODO - remove blur for testing
    return (
        <React.Fragment>
            <Promos className='fadeInAnimation' data={promos} indexCallBack={slideIndexCallBack} isModalOpen={props.isModalOpen}/>
        </React.Fragment>
    )
}

export default hasLoginModal(PromoPage)


/*   <div className='content'>
                <div className='topZone'>
                    {promos.length > 1 && <Fade in={!isLoading} timeout={500}>
                        <PromosStepper steps={promos} activeStep={activeStep}/>
                    </Fade>}
                </div>
                <Fade in={!isLoading} timeout={500}>
                    <div className='bottomZonePromo' style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}>
                    <div className='bottomZonePromo'>
                        <Button color="primary" variant="contained" className={['bottomButton', 'bottom-2-rem'].join(' ')} onClick={onStart}>
                            {translation.startPageButtonText}
                        </Button>
                        <Link href={dataProvider.getAllData().cguURL} className='linkButton'>
                            <Typography >{translation.lireCGUText}</Typography>
                        </Link>
                    </div>
                </Fade>
            </div> */

/* eslint-enable */
