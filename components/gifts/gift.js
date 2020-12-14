import React, { useEffect, useState, useRef, createRef } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../../styles/jsx/gifts/gift.style'
import { useHeight } from '../../hooks/useHeight'
import IconButton from '@material-ui/core/IconButton'
import { closeIcon, lockIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'

function Gift (props, ref) {
    const { open, handleClose, gift } = props
    const classes = useStyles()
    const height = useHeight()
    const [onTransition, setTransition] = useState(undefined)
    const boxTextRef = useRef()
    const lockIconRef = createRef()

    useEffect(() => {
        setTransition(open)
    }, [])

    function onExited () {
        handleClose()
    }

    function transitionClose () {
        setTransition(false)
    }

    return (
        <Slide
            direction="up"
            in={onTransition}
            timeout={{
                appear: 1000,
                enter: 1000,
                exit: 200
            }}
            mountOnEnter
            unmountOnExit
            onExited={onExited}
        >
            <Box ref={ref}
                className={['backgroundModal', 'containerModal', classes.containerModal].join(' ')}
                tabIndex={'-1'}>
                <Box className={classes.image} style={{ backgroundImage: `url(${props.gift.imageURL})`, height: height }}/>
                <IconButton onClick={transitionClose} color="secondary" className={classes.closeBtn}>
                    { closeIcon({ className: classes.closeIcon }) }
                </IconButton>
                <Box className={classes.content} style={{ height: height }} >
                    {gift.locked
                        ? <Box className={classes.iconContainer} >
                            {lockIcon({ ref: lockIconRef, className: classes.lock })}
                        </Box>
                        : <Box className={classes.topGradient} />
                    }
                    <Box className={classes.containerText} ref={ boxTextRef }>
                        <Typography variant="h2" className={classes.title} align={'center'}
                            dangerouslySetInnerHTML={{ __html: gift.title }}>
                        </Typography>
                        <Typography variant="subtitle2" className={classes.description} align={'center'}
                            dangerouslySetInnerHTML={{ __html: gift.message }}>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Slide>
    )
}
export default React.forwardRef(Gift)
