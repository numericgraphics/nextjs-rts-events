import React, { forwardRef, useContext } from 'react'
import UserContext from './UserContext'
import Box from '@material-ui/core/Box'

const styles = {
    containerGlobal: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw'
    }
}
const InnerHeightLayout = (props, ref) => {
    const { dataProvider } = useContext(UserContext)
    return <Box ref={ref} style={{ ...styles.containerGlobal, minHeight: dataProvider.innerHeight }} className={props.class}>{props.children}</Box>
}

export default forwardRef(InnerHeightLayout)
