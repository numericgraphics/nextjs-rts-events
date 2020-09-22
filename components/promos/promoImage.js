import React from 'react'
import Box from '@material-ui/core/Box'

export default function PromoImage (props) {
    const { backgroundImageURL } = props.data

    return (
        <React.Fragment>
            <Box className={'backgroundGradientBottom'}/>
            <Box className={'background'} style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${backgroundImageURL})` }} />
        </React.Fragment>
    )
}
