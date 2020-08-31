import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router, { useRouter } from 'next/router'
import EventLayout from '../../components/eventLayout'
import InnerHeightLayout from '../../components/innerHeightLayout'
import LazyImage from '../../components/ui/LazyImage'
import { useHeight } from '../../hooks/useHeight'
import { ColorBorderButton } from '../../components/ui/ColorBorderButton'
import { getAllEvents } from '../../lib/events'

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
        textTransform: 'none'
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
    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        if (props.imageURL !== null) {
            setImageURL(props.imageURL)
        }
    }, [imageURL])

    async function gotoDashBoard () {
        await Router.push('/[events]/dashBoard', `/${events}/dashBoard`)
    }
    return (
        <EventLayout>
            <InnerHeightLayout ref={layoutRef} className={classes.containerGlobal}>
                <LazyImage style={{ ...styles.containerImage, backgroundImage: imageURL, minHeight: height }}/>
                <ColorBorderButton key={'gotoDashBoard'} variant="outlined" className={classes.button} onClick={gotoDashBoard}>
                    Dashboard
                </ColorBorderButton>
            </InnerHeightLayout>
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
