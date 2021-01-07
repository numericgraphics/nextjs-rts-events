import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/invalidImage.style'
import Typography from '@material-ui/core/Typography'
import { ColorCard } from '../card/ColorCard'
import CardContent from '@material-ui/core/CardContent'
import { ColorBorderButton } from '../button/ColorBorderButton'
import Button from '@material-ui/core/Button'

function InvalidImage (props) {
    const classes = useStyles()

    return (
        <Box className={[classes.containerInvalidImage, 'background'].join(' ')}>
            <ColorCard className={classes.colorCard}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.invalidImageText} variant="h3">
                    Votre photo n est pas valide. Voulez vous recommencer ?
                    </Typography>
                    <Button key={'cancel'} color="secondary" variant="contained" className={'button'} onClick={props.reSnap} >
                    Reprendre
                    </Button>
                    <ColorBorderButton key={'resnap'} variant="outlined" className={'buttonAlt'} onClick={props.gotoDashBoard} >
                    Annuler
                    </ColorBorderButton>
                </CardContent>
            </ColorCard>
        </Box>
    )
}
export default InvalidImage
