import React from 'react'
import { isBrowser, isMobile, isTablet } from 'react-device-detect'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { useStyles } from '../../styles/promo.style'
import { useHeight } from '../../hooks/useHeight'
import Fade from '@material-ui/core/Fade'

export default function LayoutInfo (props) {
    const styles = useStyles()
    const height = useHeight()
    const { description, title, logoURL } = props.data

    function getComponent () {
        return <Box className={styles.layoutInfoSubContent} style={{ height: height }}>
            <Box className={styles.layoutInfoSubBottomZone}>
                {logoURL && <Box className={styles.image}>
                    <CardMedia
                        className='unselectable-element'
                        draggable="false"
                        component="img"
                        alt={description}
                        image={logoURL}
                        title={title}
                    />
                </Box>}
                <Box className={'block-text-layout'}>
                    <Typography
                        variant="h1"
                        className={['title-layout', 'unselectable-element'].join(' ')}
                        align={'center'}
                        dangerouslySetInnerHTML={{ __html: title }}/>
                    <Typography
                        variant="h3"
                        className={['subtitle-layout', 'unselectable-element'].join(' ')}
                        align={'center'}
                        dangerouslySetInnerHTML={{ __html: description }}/>
                </Box>
            </Box>
        </Box>
    }

    return (
        <Box className={styles.contentSwipeableView}>
            {isMobile && <Fade in={!props.isMoving && props.selected} timeout={400}>
                {getComponent()}
            </Fade>}
            {(isBrowser && !isTablet) && getComponent()}
            <Box className={styles.backgroundSwipeableView} />
        </Box>
    )
}
