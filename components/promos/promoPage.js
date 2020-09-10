import React, { useContext, useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade/Fade'
import { useStyles } from '../../styles/promo-style'
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
    const styles = useStyles()

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

    return (
        <React.Fragment>
            <div className={styles.content}>
                <div className="topZone">
                    <Fade in={!isLoading} timeout={500}>
                        <PromosStepper steps={promos} activeStep={activeStep}/>
                    </Fade>
                </div>
                <Fade in={!isLoading} timeout={500}>
                    <div className={styles.bottomZone}>
                        <Button color="primary" variant="contained" className={styles.button} onClick={onStart}>
                            {translation.startPageButtonText}
                        </Button>
                        <Link href={dataProvider.getAllData().cguURL} className={styles.cgLink}>
                            <Typography variant="caption" className={styles.cg}>{translation.lireCGUText}</Typography>
                        </Link>
                    </div>
                </Fade>
            </div>
            <Promos className={styles.promosAnimation} data={promos} indexCallBack={slideIndexCallBack}/>
        </React.Fragment>
    )
}

export default hasLoginModal(PromoPage)
