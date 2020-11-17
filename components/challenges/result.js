import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import { ColorBorderButton } from '../ui/button/ColorBorderButton'
import GiftResult from '../gifts/giftResult'
import giftsModal from '../../hoc/hasGiftsModal'
import { preLoadImage } from '../../data/tools'
import { useStylesGlobal } from '../../styles/global.style'
import { ColorCard } from '../ui/card/ColorCard'
import CardContent from '@material-ui/core/CardContent'
import { useStyles } from '../../styles/result.style'

function Result (props) {
    const stylesGlobal = useStylesGlobal()
    const { success, gameStats, newUnlockedGifts } = props.content
    const { nextAvailableChallengeImageURL } = gameStats || {}
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
        <Fade in={showComponent} timeout={1000}>
            <Box className='content' >
                <Box className='topZoneResult'>
                    <Box className={classes.content}>
                        <Box className={classes.header}>
                            <Typography variant="h1" className={classes.title} dangerouslySetInnerHTML={{ __html: uiElements.resultTitleChunk }}/>
                            <Typography variant="subtitle1" className={classes.subTitle} dangerouslySetInnerHTML={{ __html: uiElements.resultMessageChunk }}/>
                            {!gameStats.hasAvailableChallenges &&
                                <Typography
                                    className={classes.secondCardTitle}
                                    dangerouslySetInnerHTML={{ __html: `${translation.challengeResultInfoTitle} </br> ${uiElements.noMoreChallengesChunk}` }}/>
                            }
                        </Box>
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.winPointText} variant={successVariant()}
                                    dangerouslySetInnerHTML={{ __html: `${uiElements.resultBoxChunk}` }}/>
                                {newUnlockedGifts.length ? <Typography variant="h3" className={classes.secondCardText} dangerouslySetInnerHTML={{ __html: translation.challengeResultWinGift }}/> : null
                                }
                            </CardContent>
                        </ColorCard>

                        {!!newUnlockedGifts.length &&
                            <GiftResult
                                className={classes.giftContainer}
                                translation={translation.challengeResultGiftText}
                                gift={newUnlockedGifts}
                                onClick={onStart}
                                setGift={setGift}
                            />
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
