import React, { useRef, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/eventLayout'
import InnerHeightLayout from '../../components/innerHeightLayout'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import { ColorBorderButton } from '../../components/ui/ColorBorderButton'
import { getAllEvents } from '../../lib/events'
import UserContext from '../../components/UserContext'
import Box from '@material-ui/core/Box'
import PromosStepper from '../../components/promos/promosStepper'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    button: {
        bottom: 50,
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        marginTop: 10,
        textTransform: 'none',
        backgroundColor: 'black'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300
    }

})
const styles = {
    containerImage: {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        backgroundColor: 'white'
    }
}

function Gifts (props) {
    const router = useRouter()
    const { events } = router.query
    const classes = useStyles()
    const layoutRef = useRef()
    const height = useHeight()
    const { dataProvider, gameStatsService, store } = useContext(UserContext)
    const { isLoading, setLoading, isGlobalLoading } = store
    console.log('setLoading', setLoading)
    console.log('dataprovider :', dataProvider)
    console.log('gameState: ', gameStatsService)
    console.log('store0', store)

    async function gotoDashBoard () {
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }
    return (
        <EventLayout>
            {isLoading && isGlobalLoading
                ? null
                : <div className={classes.content}>
                    <InnerHeightLayout ref={layoutRef} className={classes.containerGlobal}>
                        <Box className={classes.containerOverlayHeader} >
                            <PromosStepper steps activeStep/>
                        </Box>
                    </InnerHeightLayout>
                </div>
            }
        </EventLayout>
    )
}
export default Gifts

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const events = params.events
    return {
        props: {
            eventData: { events }
        }
    }
}
