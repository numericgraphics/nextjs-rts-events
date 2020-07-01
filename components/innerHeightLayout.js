import React, { useContext } from 'react'
import UserContext from './UserContext'
import Box from '@material-ui/core/Box'

const styles = {
    containerGlobal: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw'
    }
}

export default function InnerHeightLayout (props) {
    const { dataProvider } = useContext(UserContext)
    return <Box style={{ ...styles.containerGlobal, minHeight: dataProvider.innerHeight }} className={props.class}>{props.children}</Box>
}
