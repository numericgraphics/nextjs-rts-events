import React, { forwardRef } from 'react'
import Box from '@material-ui/core/Box'
import { useHeight } from '../hooks/useHeight'

const styles = {
    containerGlobal: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw'
    }
}
const InnerHeightLayout = (props, ref) => {
    const height = useHeight()
    return <Box ref={ref} style={{ ...props.style, ...styles.containerGlobal, minHeight: height }} className={props.class}>{props.children}</Box>
}

export default forwardRef(InnerHeightLayout)
