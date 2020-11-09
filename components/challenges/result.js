import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import UserContext from '../../hooks/userContext'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import { ColorBorderButton } from '../ui/ColorBorderButton'
import GiftResult from '../gifts/giftResult'
import giftsModal from '../../hoc/hasGiftsModal'
import { preLoadImage } from '../../data/tools'
import { useStylesGlobal } from '../../styles/global.style'
import { ColorCard } from '../../components/ui/ColorCard'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme = useTheme()) => ({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        marginBottom: 30
    },
    card: {
        minWidth: 275,
        minHeight: 200,
        margin: 20
    },
    title: {
        // fontFamily: 'srgssr-type-Bd',
        // fontSize: '1.75rem',
        textAlign: 'center',
        // lineHeight: 1.2,
        // marginBottom: 10,
        marginTop: '17vh',
        color: theme.palette.primary.contrastText
    },
    subTitle: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1.2rem',
        textAlign: 'center',
        // lineHeight: 1.2,
        color: theme.palette.primary.contrastText,
        // marginBottom: '3rem!important
        marginBottom: '5vh!important'

    },
    resultBox: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1.2rem',
        textAlign: 'center',
        // lineHeight: 1.2,
        color: theme.palette.primary.contrastText
        // marginBottom: '3rem!important

    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem',
        textAlign: 'center',
        // lineHeight: '1.8rem',
        marginBottom: 10,
        color: theme.palette.primary.contrastText
    },
    secondCardText: {
        // fontFamily: 'srgssr-type-Rg',
        // fontSize: '1,125rem',
        textAlign: 'center',
        color: theme.palette.primary.contrastText
    },
    secondCardButton: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300,
        paddingBottom: '11rem' // Pour pouvoir scroller quand il y a deux boutons...
    },
    button: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderSuccess: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    cardHeaderWrong: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    winPointText: {
        // fontFamily: 'srgssr-type-Bd',
        // fontSize: '2.5rem',
        textAlign: 'center',
        // marginTop: '15vh',
        color: theme.palette.primary.contrastText
    },
    iconType: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        fontSize: '40px'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        marginBottom: '10px',
        maxWidth: '70vw',
        flexDirection: 'column',
        marginTop: '10px'
    },
    cardContent: {
        margin: '0!important'
    },
    colorCard: {
        marginBottom: '0.4rem',
        borderRadius: '0.5rem',
        width: '90%'
    }

}))

function Result (props) {
    const stylesGlobal = useStylesGlobal()
    const { success, gameStats, newUnlockedGifts } = props.content
    const { nextAvailableChallengeImageURL } = gameStats
    const classes = useStyles()
    const [translation, setTranslation] = useState([])
    const [uiElements, setUiElements] = useState({})
    const [showComponent, setShowComponent] = useState(false)
    const { dataProvider, uiElementsService } = useContext(UserContext)

    async function continueGame () {
        setShowComponent(false)
        props.playGameCallBack()
    }

    async function gotoDashBoard () {
        setShowComponent(false)
        props.gotoDashBoard()
    }

    function onStart () {
        props.openModal()
    }

    function setGift (gift) {
        props.setGift(gift)
    }

    function imagePreCacheCallBack (result) {
        if (!result) {
            console.log('IMAGE PRE-CACHED ERROR - RESULT COMPONENT')
        }
    }

    function successVariant () {
        let variant
        success ? variant = 'h1' : variant = 'subtitle1'
        return variant
    }

    useEffect(() => {
        if (nextAvailableChallengeImageURL) {
            preLoadImage(nextAvailableChallengeImageURL, imagePreCacheCallBack)
        }
        setTranslation(dataProvider.getTranslation())
        setUiElements(uiElementsService.getUiElements())
        setShowComponent(true)
    }, [])
    return (
        <Fade in={showComponent} timeout={500}>
            <Box className='content' >
                <Box className='topZone'>
                    <Box className={classes.content}>
                        <Typography variant="h1" className={classes.title} dangerouslySetInnerHTML={{ __html: uiElements.resultTitleChunk }}/>
                        <Typography variant="subtitle1" className={classes.subTitle} dangerouslySetInnerHTML={{ __html: uiElements.resultMessageChunk }}/>
                        {!gameStats.hasAvailableChallenges &&
                            <Typography
                                className={classes.secondCardTitle}
                                dangerouslySetInnerHTML={{ __html: `${translation.challengeResultInfoTitle} </br> ${uiElements.noMoreChallengesChunk}` }}/>
                        }
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.winPointText} variant={successVariant()}
                                    dangerouslySetInnerHTML={{ __html: `${uiElements.resultBoxChunk}` }}/>
                                {newUnlockedGifts.length ? <Typography variant="h3" className={classes.secondCardText} dangerouslySetInnerHTML={{ __html: translation.challengeResultWinGift }}/> : null
                                }
                            </CardContent>
                        </ColorCard>

                        {newUnlockedGifts.length
                            ? <GiftResult
                                className={classes.giftContainer}
                                translation={translation.challengeResultGiftText}
                                gift={newUnlockedGifts}
                                onClick={onStart}
                                setGift={setGift}
                            /> : null
                        }
                    </Box>
                </Box>
                <Box className={[stylesGlobal.bottomZoneGradient, 'bottomZone'].join(' ')}>
                    {gameStats.hasAvailableChallenges
                        ? <React.Fragment>
                            <ColorBorderButton key={'gotoDashBoard'} variant="outlined" className={'buttonAlt'} onClick={gotoDashBoard}>
                                {`${translation.challengeResultButtonDashBoard}`}
                            </ColorBorderButton>
                            <Button key={'continueGame'} color="secondary" variant="contained" className={'button'} onClick={continueGame}>
                                {`${translation.challengeResultButtonContinue}`}
                            </Button>
                        </React.Fragment>
                        : <Button color="primary" variant="contained" className={'button'} onClick={gotoDashBoard}>
                            {`${translation.challengeResultButtonEnded}`}
                        </Button>
                    }
                </Box>
            </Box>
        </Fade>
    )
}

export default giftsModal(withRouter(Result))
