import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/profile/profile.style'
import Grow from '@material-ui/core/Grow'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { CustomDisabledButton } from '../../components/ui/button/CustomDisabledButton'

function Profile (props, ref) {
    const classes = useStyles()
    const [selected, setSelected] = useState(undefined)

    function onListItemClick (index) {
        setSelected(index)
    }

    function onValidate () {
        console.log('onValidate', selected)
    }

    useEffect(() => {

    }, [])

    return (
        <Grow
            in={props.open}
            timeout={1000} >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                    dangerouslySetInnerHTML={{ __html: 'Choisissez votre nouvel avatar' }}/>
                <GridList cellHeight={100} className={classes.gridList} cols={3}>
                    {props.avatars.map((tile, index) => (
                        <GridListTile
                            key={index}
                            onClick={() => onListItemClick(index)}
                            className={[selected === index ? classes.selected : null].join(' ')}>
                            <img src={tile} alt={'avatar'} />
                        </GridListTile>
                    ))}
                </GridList>
                <CustomDisabledButton
                    color="secondary"
                    variant="contained"
                    className={'button'}
                    onClick={onValidate}
                    disabled={selected === undefined}>
                    Valides ton choix
                </CustomDisabledButton>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(Profile)
