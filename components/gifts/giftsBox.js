import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'

function GiftsBox (props) {
    const theme = useTheme()
    const useStyles = makeStyles({
        gift: {
            minHeight: '34px',
            minWidth: '34px',
            width: '10vw',
            height: '10vw',
            marginLeft: '10px',
            marginRight: '10px',
            maxWidth: '50px',
            maxHeight: '50px'
        },
        gifts: {
            display: 'flex',
            margin: '10px',
            justifyContent: 'center'
        },
        textRegularCenter: {
            textAlign: 'center',
            fontFamily: 'srgssr-type-Rg',
            fontSize: '1.1rem'
        },
        cadeau: {
            fill: theme.palette.primary
        },
        medal: {
            fill: theme.palette.primary
        },
        lockedGiftIcon: {
            opacity: '0.5'
        },
        lockedMedal: {
            opacity: '0.5'
        }
    })

    const classes = useStyles()
    const [gifts, setGifts] = useState([])

    useEffect(() => {
        setGifts(props.gifts)
    }, [props.gifts])

    function giftIcon (props) {
        const click = () => {
            props.onClick(props.minScore)
        }
        return (
            <SvgIcon key={props.key} onClick={click} viewBox="0 0 34 34" className={classes.gift}>
                <svg id="IconCadeau" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" className={classes.cadeau}>
                    <rect id="Rectangle_1990" data-name="Rectangle 1990" width="34" height="34" rx="17" fill="#none"/>
                    <g id="Groupe_9085" data-name="Groupe 9085" transform="translate(7.968 6.201)">
                        <path id="Tracé_54795" data-name="Tracé 54795" d="M863.586,398.917l.019-.07c-.154-.1-.311-.2-.462-.313A3.69,3.69,0,0,1,861.581,396a2.5,2.5,0,0,1,3.229-2.851,3.837,3.837,0,0,1,2.514,1.98c.265.487.5.992.744,1.488l.159.321c.313-.623.592-1.212.9-1.786a3.837,3.837,0,0,1,2.534-2,2.5,2.5,0,0,1,3.216,2.894,3.7,3.7,0,0,1-1.563,2.5c-.143.1-.293.2-.522.351m-5.427-.014a17.135,17.135,0,0,0-1.583-3.361,2.16,2.16,0,0,0-1.583-.946.95.95,0,0,0-1.147,1.044A2.084,2.084,0,0,0,864,397.3,16.477,16.477,0,0,0,867.368,398.875Zm1.7-.134.124.1a14.8,14.8,0,0,0,3.349-1.606,2.036,2.036,0,0,0,.866-1.626.945.945,0,0,0-1.124-1.038,2.04,2.04,0,0,0-1.645,1.019C870.078,396.615,869.591,397.687,869.072,398.741Z" transform="translate(-858.722 -393.053)" fill="#fffffe"/>
                        <g id="Groupe_9084" data-name="Groupe 9084" transform="translate(0 5.78)">
                            <rect id="Rectangle_2069" data-name="Rectangle 2069" width="8.642" height="4.219" transform="translate(0 0)" fill="#fffffe"/>
                            <rect id="Rectangle_2070" data-name="Rectangle 2070" width="8.097" height="4.219" transform="translate(10.343 0)" fill="#fffffe"/>
                            <rect id="Rectangle_2071" data-name="Rectangle 2071" width="7.009" height="9.662" transform="translate(10.343 5.171)" fill="#fffffe"/>
                            <rect id="Rectangle_2072" data-name="Rectangle 2072" width="7.485" height="9.662" transform="translate(1.157 5.171)" fill="#fffffe"/>
                        </g>
                    </g>
                </svg>
            </SvgIcon>
        )
    }

    function lockedGiftIcon (props) {
        return (
            <SvgIcon key={props.key} viewBox="0 0 34 34" className={classes.gift}>
                <svg id="IconCadeau" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" className={classes.lockedGiftIcon}>
                    <g id="Groupe_9085" data-name="Groupe 9085" transform="translate(7.968 6.201)">
                        <path id="Tracé_54795" data-name="Tracé 54795" d="M863.586,398.917l.019-.07c-.154-.1-.311-.2-.462-.313A3.69,3.69,0,0,1,861.581,396a2.5,2.5,0,0,1,3.229-2.851,3.837,3.837,0,0,1,2.514,1.98c.265.487.5.992.744,1.488l.159.321c.313-.623.592-1.212.9-1.786a3.837,3.837,0,0,1,2.534-2,2.5,2.5,0,0,1,3.216,2.894,3.7,3.7,0,0,1-1.563,2.5c-.143.1-.293.2-.522.351m-5.427-.014a17.135,17.135,0,0,0-1.583-3.361,2.16,2.16,0,0,0-1.583-.946.95.95,0,0,0-1.147,1.044A2.084,2.084,0,0,0,864,397.3,16.477,16.477,0,0,0,867.368,398.875Zm1.7-.134.124.1a14.8,14.8,0,0,0,3.349-1.606,2.036,2.036,0,0,0,.866-1.626.945.945,0,0,0-1.124-1.038,2.04,2.04,0,0,0-1.645,1.019C870.078,396.615,869.591,397.687,869.072,398.741Z" transform="translate(-858.722 -393.053)" fill="#fff"/>
                        <g id="Groupe_9084" data-name="Groupe 9084" transform="translate(0 5.78)">
                            <rect id="Rectangle_2069" data-name="Rectangle 2069" width="8.642" height="4.219" transform="translate(0 0)" fill="#fffffe"/>
                            <rect id="Rectangle_2070" data-name="Rectangle 2070" width="8.097" height="4.219" transform="translate(10.343 0)" fill="#fffffe"/>
                            <rect id="Rectangle_2071" data-name="Rectangle 2071" width="7.009" height="9.662" transform="translate(10.343 5.171)" fill="#fffffe"/>
                            <rect id="Rectangle_2072" data-name="Rectangle 2072" width="7.485" height="9.662" transform="translate(1.157 5.171)" fill="#fffffe"/>
                        </g>
                    </g>
                </svg>
            </SvgIcon>
        )
    }

    function medalIcon (props) {
        const click = () => {
            props.onClick(props.minScore)
        }
        return (
            <SvgIcon key={props.key} onClick={click} viewBox="0 0 34 34" className={classes.gift}>
                <svg id="IconMedaille" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" className={classes.medal}>
                    <rect id="Rectangle_1990" data-name="Rectangle 1990" width="34" height="34" rx="17" fill="#none"/>
                    <path id="Tracé_54399" data-name="Tracé 54399" d="M16.444,11.069a2.755,2.755,0,0,0,1.474-2.054,2.755,2.755,0,0,0-1.474-2.054,5.763,5.763,0,0,1-.794-.685,3.763,3.763,0,0,1,0-1.141c.113-.8.227-1.826-.454-2.4a2.583,2.583,0,0,0-2.381-.456,3.7,3.7,0,0,1-1.134,0,2.47,2.47,0,0,1-.68-.8A2.74,2.74,0,0,0,8.959,0,2.74,2.74,0,0,0,6.918,1.483a5.255,5.255,0,0,1-.794.8,3.7,3.7,0,0,1-1.134,0,2.27,2.27,0,0,0-2.381.342,2.625,2.625,0,0,0-.454,2.4,3.763,3.763,0,0,1,0,1.141c0,.228-.454.571-.68.8A2.755,2.755,0,0,0,0,9.015a2.755,2.755,0,0,0,1.474,2.054,5.763,5.763,0,0,1,.794.685,3.763,3.763,0,0,1,0,1.141c-.113.8-.227,1.826.454,2.4l.113.114.68.342L1.474,20.882a.708.708,0,0,0,.227.8.7.7,0,0,0,.794.114l2.268-1.027.794,2.054a.932.932,0,0,0,.68.456h0a.766.766,0,0,0,.68-.456l2.041-4.793L11,22.822a.766.766,0,0,0,.68.456h0a.622.622,0,0,0,.68-.456L13.268,21l2.268,1.027a.669.669,0,0,0,.794-.114.759.759,0,0,0,.227-.8l-2.041-5.135.68-.342a.111.111,0,0,0,.113-.114,2.625,2.625,0,0,0,.454-2.4,3.763,3.763,0,0,1,0-1.141C15.763,11.639,16.1,11.3,16.444,11.069ZM8.959,5.135a3.88,3.88,0,0,1,0,7.759A3.933,3.933,0,0,1,4.99,9.015,3.933,3.933,0,0,1,8.959,5.135Z" transform="translate(8.256 5.292)" fill="#fffffe"/>
                </svg>
            </SvgIcon>
        )
    }

    function disabledMedalIcon (props) {
        return (
            <SvgIcon key={props.key} viewBox="0 0 34 34" className={classes.gift}>
                <svg id="IconMedaille" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" className={classes.lockedMedal}>
                    <rect id="Rectangle_1990" data-name="Rectangle 1990" width="34" height="34" rx="17" fill="none"/>
                    <path id="Tracé_54399" data-name="Tracé 54399" d="M16.444,11.069a2.755,2.755,0,0,0,1.474-2.054,2.755,2.755,0,0,0-1.474-2.054,5.763,5.763,0,0,1-.794-.685,3.763,3.763,0,0,1,0-1.141c.113-.8.227-1.826-.454-2.4a2.583,2.583,0,0,0-2.381-.456,3.7,3.7,0,0,1-1.134,0,2.47,2.47,0,0,1-.68-.8A2.74,2.74,0,0,0,8.959,0,2.74,2.74,0,0,0,6.918,1.483a5.255,5.255,0,0,1-.794.8,3.7,3.7,0,0,1-1.134,0,2.27,2.27,0,0,0-2.381.342,2.625,2.625,0,0,0-.454,2.4,3.763,3.763,0,0,1,0,1.141c0,.228-.454.571-.68.8A2.755,2.755,0,0,0,0,9.015a2.755,2.755,0,0,0,1.474,2.054,5.763,5.763,0,0,1,.794.685,3.763,3.763,0,0,1,0,1.141c-.113.8-.227,1.826.454,2.4l.113.114.68.342L1.474,20.882a.708.708,0,0,0,.227.8.7.7,0,0,0,.794.114l2.268-1.027.794,2.054a.932.932,0,0,0,.68.456h0a.766.766,0,0,0,.68-.456l2.041-4.793L11,22.822a.766.766,0,0,0,.68.456h0a.622.622,0,0,0,.68-.456L13.268,21l2.268,1.027a.669.669,0,0,0,.794-.114.759.759,0,0,0,.227-.8l-2.041-5.135.68-.342a.111.111,0,0,0,.113-.114,2.625,2.625,0,0,0,.454-2.4,3.763,3.763,0,0,1,0-1.141C15.763,11.639,16.1,11.3,16.444,11.069ZM8.959,5.135a3.88,3.88,0,0,1,0,7.759A3.933,3.933,0,0,1,4.99,9.015,3.933,3.933,0,0,1,8.959,5.135Z" transform="translate(8.256 5.292)" fill="#fffffe"/>
                </svg>
            </SvgIcon>
        )
    }

    function getGifts (gifts) {
        // eslint-disable-next-line prefer-const
        let re = []
        if (!gifts) {
            return null
        }
        for (let i = 0; i < gifts.length; i++) {
            if (gifts[i].type === 'lottery') {
                gifts[i].locked ? re.push(lockedGiftIcon({ key: i })) : re.push(giftIcon({ key: i, onClick: props.onClick, minScore: gifts[i].minScore }))
            } else if (gifts[i].type === 'medal') {
                gifts[i].locked ? re.push(disabledMedalIcon({ key: i })) : re.push(medalIcon({ key: i, onClick: props.onClick, minScore: gifts[i].minScore }))
            }
        }
        return re
    }

    return (
        <Box className={classes.container}>
            <Typography className={classes.textRegularCenter}>
                {props.translation}
            </Typography>
            <Box className={classes.gifts}>
                {getGifts(gifts)}
            </Box>
        </Box>
    )
}

export default GiftsBox
